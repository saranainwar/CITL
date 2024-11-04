const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
        unique: true
    },
    userId: {
        type: String,
        
        unique: true
    },
    passwordHash: {
        type: String, // Remove required field for Google OAuth users
        required: function() {
            // Only require passwordHash if the user is not using Google OAuth
            return !this.googleId;
        }
    },
    role: {
        type: String,
        
    },
    googleId: {
        type: String, // Add a field for Google OAuth users
        unique: true,
        sparse: true // Make sure to allow null values but keep it unique if present
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
