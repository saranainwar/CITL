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
  grossMargin: { type: Number, default: 0 },
  netMargin: { type: Number, default: 0 },
  ebitda: { type: Number, default: 0 },
  lifetimeSales: { type: Number, default: 0 },
  companyValuation: { type: Number, default: 0 },

  // Investors as an array of objects
  investors: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  }],

  profilePhoto: { type: String },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;

