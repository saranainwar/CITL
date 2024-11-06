const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const Profile = require('./models/profile.js');
const User = require('./models/newuser.js');
const multer = require('multer');
require('dotenv').config();
const Startup = require('./models/startup_profile.js');
const { InvestorRequest, StartupRequest } = require('./models/connection.js');
const Message = require('./models/message.js');
const app = express();
const port = process.env.PORT || 3000;
const upload = multer();
const axios = require('axios');
const jwt = require('jsonwebtoken');
// Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'uUilkjkeeR',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true in production with HTTPS
}));

// Passport configuration for Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists by Google ID
        let user = await User.findOne({ googleId: profile.id });

        // If no user is found, create a new one
        if (!user) {
            user = new User({
                googleId: profile.id,
                userId: profile.displayName,  // Use profile.id as the userId, ensure it's unique
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'startup'  // Assign a default role
            });
            await user.save();

        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);  // Storing user ID in the session
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpxltvoqv',
  api_key: '284189174857999',
  api_secret: 'ul6K_1_-XMuEpGBVsWMMHOIQS50'
});


// MongoDB connection
mongoose.connect('mongodb+srv://maureenmiranda22:PqxEHalWziPVqy7n@cluster0.ive9g.mongodb.net/citl?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Google OAuth routes
app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user.role);
        // Redirect based on user role
        if (user.role === 'investor') {
            return res.redirect(`http://localhost:5173/investor/${user._id}`);
        } else if (user.role === 'startup') {
            return res.redirect(`http://localhost:5173/startup_profile/${user._id}`);
        } else {
            return res.status(400).json({ message: 'Unknown role' });
        }
    } catch (error) {
        console.error('Error fetching user role after OAuth:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Login route
app.post('/authorize/login', async (req, res) => {
    const { userId, password } = req.body;
    
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (isMatch) {
            // Generate JWT
            const token = jwt.sign(
                { id: user._id, role: user.role, email: user.email }, // payload
                process.env.JWT_SECRET, // secret key from environment variable
                { expiresIn: '1h' } // token expiration
            );

            // Determine redirect URL based on user role
            let redirectUrl;
            if (user.role === 'investor') {
                redirectUrl = `http://localhost:5173/investor/${user._id}`;
            } else if (user.role === 'startup') {
                redirectUrl = `http://localhost:5173/startup_profile/${user._id}`;
            } else {
                return res.status(400).json({ message: 'Unknown role' });
            }
            
            // Send the JWT and URL as JSON
            return res.json({ token, redirectUrl });
        } else {
            return res.status(400).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Register route
app.post('/authorize/register', async (req, res) => {
    const { name, email, userId, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            userId,
            passwordHash,
            role
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,  // Ensure you have JWT_SECRET in your environment variables
            { expiresIn: '1h' }
        );

        // Set the token as an HTTP-only, secure cookie
        res.cookie('token', token, {
            httpOnly: true,  // Not accessible by JavaScript
            secure: true,    // Sent only over HTTPS
            sameSite: 'Lax', // Restricts cross-site requests
            maxAge: 3600000  // 1 hour in milliseconds
        });

        // Send a success message
        res.status(201).json({ message: 'User registered successfully', _id: newUser._id  });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/news', async (req, res) => {
    try {
      console.log("Fetching news articles...");
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'startup investments',
          language: 'en',
          sortBy: 'publishedAt',
        },
        headers: {
          'x-api-key': '61efcef705cc44e8bb0440c89f229804', // API key in header
        },
      });
      
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching news articles:", error.message || error);
      res.status(500).send('Error fetching news articles');
    }
  });
  
  app.post('/profile/update', upload.single('profilePhoto'), async (req, res) => {
    const {
     userId,
      title,
      email,
      contactNumber,
      companyFounded,
      shortDescription,
      bio,
      gender,
      birthdate,
      location,
      returnOnInvestment,
      totalInvestments,
      totalfundInvested,
      averageReturnOnInvestment,
      yearsOfExperience,
      geographicPreference,
      exitHistory,
      keyAchievements,
      investmentRange,
      topInvestments,
      industriesOfInterest,
    } = req.body;
  
    // Parse any numerical values from strings
    const numericFields = {
      totalInvestments: Number(totalInvestments),
      totalfundInvested: Number(totalfundInvested),
      averageReturnOnInvestment: Number(averageReturnOnInvestment),
      yearsOfExperience: Number(yearsOfExperience),
      returnOnInvestment: Number(returnOnInvestment),
    };
  
    try {

      let profilePhotoUrl = null;

      // If a profile photo is provided, upload to Cloudinary
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "profile_photos", resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.file.buffer);
        });
        
        profilePhotoUrl = result.secure_url; // Get the secure URL of the uploaded image
      }


      // Create or update profile based on your application logic
      const profile = new Profile({
        userId,
        title,
        email,
        contactNumber,
        companyFounded,
        shortDescription,
        bio,
        gender,
        birthdate,
        location,
        returnOnInvestment: numericFields.returnOnInvestment,
        totalInvestments: numericFields.totalInvestments,
        totalfundInvested: numericFields.totalfundInvested,
        averageReturnOnInvestment: numericFields.averageReturnOnInvestment,
        yearsOfExperience: numericFields.yearsOfExperience,
        geographicPreference: geographicPreference ? geographicPreference : [],
        exitHistory: exitHistory ? exitHistory : [],
        keyAchievements: keyAchievements ? keyAchievements : [],
        investmentRange,
        topInvestments: topInvestments ? topInvestments : [],

        profilePhoto: profilePhotoUrl, // Store Cloudinary URL
        industriesOfInterest: industriesOfInterest ? industriesOfInterest : [],
      });

  
      await profile.save();
      res.status(201).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// Display profile route
app.get('/profile', async (req, res) => {
    const { userId } = req.query;
    console.log(userId);
    try {
        // Find the profile by email
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Respond with profile data
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/startupProfile/update', upload.single('profilePhoto'), async (req, res) => {
    const { personalDetail, companyDetail, investors } = req.body;

    try {
        // Parse the incoming JSON strings into objects
        const parsedPersonalDetail = JSON.parse(personalDetail);
        const parsedCompanyDetail = JSON.parse(companyDetail);
        const parsedInvestors = JSON.parse(investors);

        let profilePhotoUrl = null;

        // If there's a profile photo, upload it to Cloudinary
        if (req.file) {
            // Use cloudinary uploader's promise-based API
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "startup_profile_photos",
                        resource_type: "image"
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });

            profilePhotoUrl = result.secure_url;
        }

        const profileData = {
            ...parsedPersonalDetail,
            ...parsedCompanyDetail,
            investors: parsedInvestors,
            profilePhoto: profilePhotoUrl, // Store Cloudinary URL in MongoDB
        };

        const profile = new Startup(profileData);
        await profile.save();

        res.status(201).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/api/startups', async (req, res) => {
    try {
        const startups = await Startup.find({});
        res.json(startups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startups', error: error.message });
    }
});
app.get('/find/startups', async (req, res) => {
    const { userId } = req.query;
    try {
        console.log(userId);
        const username=await User.findOne({_id:userId});

        const startups = await Startup.findOne({title:username.userId});

        console.log(startups);
        res.json(startups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startups', error: error.message });
    }
});

app.get('/api/startup', async (req, res) => {
    try {
        const startups = await Startup.find({});
      
        res.json(startups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startups', error: error.message });
    }
});
app.get('/api/startuprequest/:investorId', async (req, res) => {
    try {
        const startups = await Startup.find({});
     
        res.json(startups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startups', error: error.message });
    }
});
app.get('/api/startupreq/:investorId', async (req, res) => {
    const { investorId } = req.params;
    try {
        const startups = await InvestorRequest.find({investor_id: investorId}).populate('startup_id');
        res.json(startups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startups', error: error.message });
    }
});
app.get('/api/startup/:investorId', async (req, res) => {
    const { investorId } = req.params;
    console.log(investorId);
    try {
        const requests = await StartupRequest.find({ investor_id: investorId }).populate('startup_id');
       
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startup requests', error: error.message });
    }
});

app.post('/api/startuprequest', async (req, res) => {
    try {
        const {
            startupId,
            investorId,
            message,
            funding_amount,
            equity_offered,
            status,
            startup_name
        } = req.body;

        // Validate required fields
        if (!startupId || !investorId || !message || !funding_amount || !equity_offered) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new startup request
        const startupRequest = new StartupRequest({
            startup_id: startupId,
            investor_id: investorId,
            message,
            funding_amount,
            equity_offered,
            status,
            startup_name,
        });

        // Save to database
        const savedRequest = await startupRequest.save();

        // Send success response
        res.status(201).json({
            message: 'Startup request created successfully',
            request: savedRequest
        });

    } catch (error) {
        console.error('Error creating startup request:', error);
        res.status(500).json({
            message: 'Error creating startup request',
            error: error.message
        });
    }
});


app.get('/api/startupN/:investorId',async(req,res)=>{ 
    const { investorId } = req.params;
    console.log(investorId);
    try {
        const requests = await StartupRequest.find({ investor_id: investorId }).populate('startup_id');
        const startupIdsInRequests = requests.map(request => request.startup_id._id);
        const startupsNotInRequests = await Startup.find({ _id: { $nin: startupIdsInRequests } });
      
        res.json(startupsNotInRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startup requests', error: error.message });
    }
 }
)
app.get('/api/investorK/:startupId',async(req,res)=>{ 
    const { startupId} = req.params;
    console.log(startupId);
    try {
        console.log("cje");
        const requests = await InvestorRequest.find({ startup_id: startupId });
        console.log("cje");
        const startupIdsInRequests = requests.map(request => request.investor_id._id);
        console.log("cje");
        const startupsNotInRequests = await Profile.find({ _id: { $nin: startupIdsInRequests } });
        console.log("cje");
        
        res.json(startupsNotInRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startup requests', error: error.message });
    }
 })
 app.get('/api/investorreq/:startupId', async (req, res) => {
    const { startupId } = req.params;
    try {
        const requests = await StartupRequest.find({ startup_id: startupId })
            .populate({
                path: 'investor_id',
                select: 'title' // Select only the investor name from the Investor profile
            });
        
        res.json(requests);
    } catch (error) {   
        console.error('Error fetching investor requests:', error); 
        res.status(500).json({ message: 'Error fetching investor requests', error: error.message });
    }
});
app.post('/api/investorrequest', async (req, res) => {
    try {
        console.log("hi");

        const {
            startup_id,
            investor_id,
            message,
            pitch_deck_url,
            funding_amount,
            equity_offered,
            investor_name
        } = req.body;
        console.log(funding_amount)

        // Validate required fields
        if (!startup_id || !investor_id || !message || !funding_amount || !equity_offered) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new investor request
        const investorRequest = new InvestorRequest({
            startup_id,
            investor_id,
            message,
            pitch_deck_url,
            proposed_investment:funding_amount,
            equity_asked:equity_offered,
            investor_name,
        });

        // Save to database
        const savedRequest = await investorRequest.save();

        // Send success response
        res.status(201).json({
            message: 'Investor request created successfully',
            request: savedRequest
        });

    } catch (error) {
        console.error('Error creating investor request:', error);
        res.status(500).json({
            message: 'Error creating investor request',
            error: error.message
        });
    }
});

app.get('/api/investorrequest/startup/:startupId', async (req, res) => 
{
    const { startupId } = req.params;
    console.log(startupId);
    try {
        const requests = await InvestorRequest.find({ startup_id: startupId });
      
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching investor requests', error: error.message });
    }
});
// Add this to your existing Express routes in the server file

// Patch route to update the status of a startup request
// Patch route to update the status of a startup request
app.patch('/api/startupreq/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        // Find and update the startup request
        const updatedRequest = await InvestorRequest.findByIdAndUpdate(
            requestId, 
            { 
                status,
                updated_at: Date.now() 
            }, 
            { 
                new: true, // Return the updated document
                runValidators: true // Ensure schema validations run on update
            }
        );
       console.log(updatedRequest);
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Startup request not found' });
        }

        res.status(200).json({
            message: 'Startup request status updated successfully',
            request: updatedRequest
        });
    } catch (error) {
        console.error('Error updating startup request status:', error);
        res.status(500).json({
            message: 'Error updating startup request status',
            error: error.message
        });
    }
});
  
  // Similar patch route for investor requests
  app.patch('/api/investorrequest/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
  
    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  console.log("in")
    try {
      // Find and update the investor request
      const updatedRequest = await StartupRequest.findByIdAndUpdate(
        requestId, 
        { 
          status, 
          updated_at: Date.now() 
        }, 
        { 
          new: true, // Return the updated document
          runValidators: true // Ensure schema validations run on update
        }
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Investor request not found' });
      }
  
      res.status(200).json({
        message: 'Investor request status updated successfully',
        request: updatedRequest
      });
    } catch (error) {
      console.error('Error updating investor request status:', error);
      res.status(500).json({
        message: 'Error updating investor request status',
        error: error.message
      });
    }
  });

  app.get('/api/startup-requests', async (req, res) => {
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');

    const { investor_id, status } = req.query;

    try {
        // Validate required parameters
        if (!investor_id || !status) {
            return res.status(400).json({ 
                success: false,
                message: 'Missing required parameters: investor_id and status' 
            });
        }

        // Validate investor_id format
        if (!mongoose.Types.ObjectId.isValid(investor_id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid investor_id format'
            });
        }

        // Fetch accepted startup requests
        const startupRequests = await StartupRequest.find({
            investor_id: investor_id,
            status: status
        }).populate({
            path: 'startup_id',
            model: 'Startup',
            select: 'title shortDescription bio companyFounded companyValuation equity_offered returnOnInvestment location email'
        });

        // Fetch accepted investor requests
        const investorRequests = await InvestorRequest.find({
            investor_id: investor_id,
            status: status
        }).populate({
            path: 'startup_id',
            model: 'Startup',
            select: 'title shortDescription bio companyFounded companyValuation equity_offered returnOnInvestment location email'
        });

        // Combine both request arrays
        const combinedRequests = [...startupRequests, ...investorRequests];

        // Handle case where no requests are found
        if (!combinedRequests.length) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No startup requests found'
            });
        }

        // Transform the data
        const transformedRequests = combinedRequests.map(request => ({
            _id: request._id,
            startup_id: request.startup_id._id,
            startup_name: request.startup_name,
            message: request.message,
            funding_amount: request.funding_amount || request.proposed_investment,
            equity_offered: request.equity_offered || request.equity_asked,
            status: request.status,
            created_at: request.created_at,
            updated_at: request.updated_at,
            companyValuation: request.startup_id.companyValuation || 0,
            companyFounded: request.startup_id.companyFounded,
            shortDescription: request.startup_id.shortDescription || 'No description available',
            location: request.startup_id.location || 'Unknown',
            email: request.startup_id.email || '',
            returnOnInvestment: request.startup_id.returnOnInvestment || 0,
        }));

        return res.status(200).json({
            success: true,
            data: transformedRequests,
            message: 'Startup requests retrieved successfully'
        });

    } catch (error) {
        console.error('Error fetching startup requests:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching startup requests',
            error: error.message
        });
    }
});

app.get('/api/messages', async (req, res) => {
    const { investor_id, startup_id } = req.query;
  
    // Validate parameters
    if (!investor_id || !startup_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: investor_id and startup_id',
      });
    }
  
    try {
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(investor_id) || !mongoose.Types.ObjectId.isValid(startup_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID format',
        });
      }
  
      // Find messages
      const messages = await Message.find({ investor_id, startup_id }).sort({ timestamp: 1 });
  
      return res.status(200).json({
        success: true,
        data: messages,
        message: 'Messages retrieved successfully',
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching messages',
        error: error.message,
      });
    }
  });
  app.post('/api/messages', async (req, res) => {
    const { investor_id, startup_id, message } = req.body;
  
    // Validate parameters
    if (!investor_id || !startup_id || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: investor_id, startup_id, and message',
      });
    }
  
    try {
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(investor_id) || !mongoose.Types.ObjectId.isValid(startup_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ID format',
        });
      }
  
      // Create and save a new message
      const newMessage = new Message({
        investor_id,
        startup_id,
        message,
      });
  
      await newMessage.save();
  
      return res.status(201).json({
        success: true,
        data: newMessage,
        message: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({
        success: false,
        message: 'Error sending message',
        error: error.message,
      });
    }
  });
  app.get('/api/investors/:startupId', async (req, res) => {
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');

    const { startupId } = req.params;

    try {
        // Validate startupId format
        if (!mongoose.Types.ObjectId.isValid(startupId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid startupId format'
            });
        }

        // Fetch accepted investor requests for the specified startup
        const investorRequests = await InvestorRequest.find({
            startup_id: startupId,
            status: 'accepted'
        }).populate({
            path: 'investor_id',
            model: 'Profile',
            select: 'title email contactNumber companyFounded shortDescription totalInvestments totalfundInvested bio gender birthdate location returnOnInvestment profilePhoto'
        });

        // Fetch accepted startup requests for the specified startup
        const startupRequests = await StartupRequest.find({
            startup_id: startupId,
            status: 'accepted'
        }).populate({
            path: 'investor_id',
            model: 'Profile',
            select: 'title email contactNumber companyFounded shortDescription totalInvestments totalfundInvested bio gender birthdate location returnOnInvestment profilePhoto'
        });

        // Combine both request arrays
        const combinedRequests = [...investorRequests, ...startupRequests];

        // Handle case where no investors are found
        if (!combinedRequests.length) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No accepted investors found for this startup'
            });
        }

        // Transform the data
        const transformedInvestors = combinedRequests.map(request => ({
            _id: request._id,
            investor_id: request.investor_id._id,
            investor_name: request.investor_id.title,
            message: request.message,
            proposed_investment: request.proposed_investment || request.funding_amount,
            equity_asked: request.equity_asked || request.equity_offered,
            status: request.status,
            created_at: request.created_at,
            updated_at: request.updated_at,
            totalInvestments: request.investor_id.totalInvestments || 0,
            totalfundInvested: request.investor_id.totalfundInvested || 0,
            bio: request.investor_id.bio || 'No bio available',
            location: request.investor_id.location || 'Unknown',
            returnOnInvestment: request.investor_id.returnOnInvestment || 0,
            profilePhoto: request.investor_id.profilePhoto || '',
        }));

        return res.status(200).json({
            success: true,
            data: transformedInvestors,
            message: 'Accepted investors retrieved successfully'
        });

    } catch (error) {
        console.error('Error fetching investors:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching investors',
            error: error.message
        });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});