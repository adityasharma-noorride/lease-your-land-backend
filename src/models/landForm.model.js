const mongoose = require('mongoose');

const landFormSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  aadhaar: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  addressLine1: {
    type: String,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  khasra: {
    type: String,
    trim: true
  },
  tehseel: {
    type: String,
    trim: true
  },
  area: {
    type: String,
    trim: true
  },
  unit: {
    type: String,
    enum: ['Acres', 'Gaj', 'Square Feet', 'Hectares', 'Bigha', 'Guntha'],
    default: 'Acres'
  },
  documentType: {
    type: String,
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
  },
  agreeToTerms: {
    type: String,
  },
  contactName: {
    type: String,
  },
  contactSurname: {
    type: String,
  },
  contactTitle: {
    type: String,
  },
  isLandowner: {
    type: String,
  },
  khasraNumber: {
    type: String,
  },
  landArea: {
    type: String,
  },
  landType: {
    type: String,
  },
  locationAddress: {
    type: String,
  },
  locationPostalCode: {
    type: String,
  },
  locationState: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
}, {
  timestamps: true
});

// Index for better query performance
landFormSchema.index({ email: 1, submittedAt: -1 });
landFormSchema.index({ aadhaar: 1 });
landFormSchema.index({ status: 1 });

const LandForm = mongoose.model('LandForm', landFormSchema);

module.exports = LandForm;