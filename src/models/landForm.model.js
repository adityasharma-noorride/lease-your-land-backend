const mongoose = require('mongoose');

const landFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  aadhaar: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  khasra: {
    type: String,
    required: true,
    trim: true
  },
  tehseel: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['Acres', 'Gaj', 'Square Feet', 'Hectares', 'Bigha', 'Guntha'],
    default: 'Acres'
  },
  documentType: {
    type: String,
    required: true,
    enum: ['Aadhaar Card', 'PAN Card', 'Rashan Card', 'Driving Licence', 'Passport', 'Other'],
    default: 'Aadhaar Card'
  },
  documentFile: {
    filename: String,
    originalName: String,
    path: String,
    mimetype: String
  },
  disclaimer: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
landFormSchema.index({ email: 1, submittedAt: -1 });
landFormSchema.index({ aadhaar: 1 });
landFormSchema.index({ status: 1 });

const LandForm = mongoose.model('LandForm', landFormSchema);

module.exports = LandForm;