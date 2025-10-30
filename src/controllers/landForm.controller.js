const LandForm = require('../models/landForm.model');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const path = require('path');
const fs = require('fs');

// Submit land form
const submitLandForm = catchAsync(async (req, res) => {
  const {
    name,
    aadhaar,
    phone,
    email,
    addressLine1,
    addressLine2,
    state,
    city,
    khasra,
    tehseel,
    area,
    unit,
    documentType,
    disclaimer,
    agreeToTerms,
    contactName,
    contactSurname,
    contactTitle,
    isLandowner,
    khasraNumber,
    landArea,
    landType,
    locationAddress,
    locationPostalCode,
    locationState,
    phoneNumber,
  } = req.body;
  


  // Check if disclaimer is accepted
  // if (!disclaimer || disclaimer === 'false' || false) {
  //   return res.status(httpStatus.BAD_REQUEST).json({
  //     status: 'error',
  //     message: 'You must accept the disclaimer to submit the form.'
  //   });
  // }

  // Prepare document file data
  let documentFile = null;
  if (req.file) {
    documentFile = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype
    };
  }

  // Create new land form submission
  const landForm = await LandForm.create({
    name,
    aadhaar,
    phone,
    email,
    addressLine1,
    addressLine2,
    state,
    city,
    khasra,
    tehseel,
    area,
    unit,
    documentType,
    documentFile,
    agreeToTerms,
    contactName,
    contactSurname,
    contactTitle,
    isLandowner,
    khasraNumber,
    landArea,
    landType,
    locationAddress,
    locationPostalCode,
    locationState,
    phoneNumber,
    disclaimer: disclaimer === true || disclaimer === 'true'
  });

  res.status(httpStatus.CREATED).json({
    status: 'success',
    message: 'Land form submitted successfully!',
    data: {
      landForm: {
        id: landForm._id,
        name: landForm.name,
        email: landForm.email,
        status: landForm.status,
        submittedAt: landForm.submittedAt
      }
    }
  });
});

// Get all land forms (for admin)
const getAllLandForms = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (page - 1) * limit;

  let filter = {};
  if (status) {
    filter.status = status;
  }

  const landForms = await LandForm.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))

  const total = await LandForm.countDocuments(filter);

  res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      landForms,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// Get land form by ID
const getLandFormById = catchAsync(async (req, res) => {
  const landForm = await LandForm.findById(req.params.id).select('-__v');

  if (!landForm) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'error',
      message: 'Land form not found.'
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      landForm
    }
  });
});

// Update land form status (for admin)
const updateLandFormStatus = catchAsync(async (req, res) => {
  const { status } = req.body;

  const landForm = await LandForm.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).select('-__v');

  if (!landForm) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'error',
      message: 'Land form not found.'
    });
  }

  res.status(httpStatus.OK).json({
    status: 'success',
    message: 'Land form status updated successfully!',
    data: {
      landForm
    }
  });
});

// Serve uploaded documents
const getDocument = catchAsync(async (req, res) => {
  const landForm = await LandForm.findById(req.params.id);

  if (!landForm || !landForm.documentFile) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'error',
      message: 'Document not found.'
    });
  }

  const filePath = landForm.documentFile.path;

  if (!fs.existsSync(filePath)) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'error',
      message: 'File not found on server.'
    });
  }

  res.setHeader('Content-Type', landForm.documentFile.mimetype);
  res.setHeader('Content-Disposition', `inline; filename="${landForm.documentFile.originalName}"`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

module.exports = {
  submitLandForm,
  getAllLandForms,
  getLandFormById,
  updateLandFormStatus,
  getDocument
}