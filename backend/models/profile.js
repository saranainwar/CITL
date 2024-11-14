const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Unique user ID
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email validation
  contactNumber: { type: String, required: true }, // Make required if needed
  totalInvestments: { type: Number, default: 0 }, // Default value
  totalFundsInvested: { type: Number, default: 0 }, // Corrected typo
  bio: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] }, // Enum validation
  birthdate: { type: Date },
  location: { type: String },
  returnOnInvestment: { type: String }, // Consider using Number for more accurate calculations
  profilePhoto: { type: String }, // URL or path to the saved image
  topInvestments: [
 {type:String}
  ],
  averageReturnOnInvestment: { type: Number, default: 0 }, // Default value
  industriesOfInterest: [{ type: String }],
  geographicPreference: [{ type: String }],
  investmentRange: { type: String }, // Consider adding validation or a structured format
  yearsOfExperience: { type: Number, min: 0 }, // Ensure no negative values
  exitHistory: [
  { type: String }
  ],
  keyAchievements: [{ type: String }], // List of notable achievements
}, { timestamps: true });

profileSchema.virtual('investor_id').get(function() {
  return this.userId;
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
