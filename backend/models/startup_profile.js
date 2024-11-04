const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  // Personal details
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  bio: { type: String, required: true },
  gender: { type: String },
  birthdate: { type: Date },
  location: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },

  // Company details
  companyFounded: { type: Date },
  returnOnInvestment: { type: Number },
  mission: { type: String },
  companyDescription: { type: String },
  grossMargin: { type: Number },
  netMargin: { type: Number },
  ebitda: { type: Number },
  lifetimeSales: { type: Number },
  companyValuation: { type: Number },

  // Investors as an array of objects
  investors: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  }],

  // Profile photo (stored as buffer)
  profilePhoto: { type: Buffer },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;

