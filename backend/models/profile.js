const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true},
  contactNumber: { type: String},
  companyFounded: { type: String },
  shortDescription: { type: String },
  totalInvestments: { type: Number },
  totalfundInvested: { type: Number },
  bio: { type: String },
  gender: { type: String },
  birthdate: { type: Date },
  location: { type: String },
  returnOnInvestment: { type: String },
  profilePhoto: { type: String }, // URL or path to the saved image
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
