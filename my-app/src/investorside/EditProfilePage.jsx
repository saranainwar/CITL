import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
const EditProfilePage = () => {
  const { userId } = useParams(); 
  const [profile, setProfile] = useState({
    title: '',
    email: '',
    contactNumber: '',
    companyFounded: '',
    shortDescription: '',
    totalInvestments: 0,
    totalfundInvested: 0,
    bio: '',
    gender: '',
    birthdate: '',
    location: '',
    returnOnInvestment: '',
    profilePhoto: null,
    topInvestments: [],
    averageReturnOnInvestment: 0,
    investmentStage: '',
    industriesOfInterest: [],
    geographicPreference: [],
    investmentRange: '',
    yearsOfExperience: 0,
    portfolioCompanies: [],
    exitHistory: [],
    keyAchievements: [],
  });
const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: files[0],
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value === '' ? '' : value,
      }));
    }
  };

  const handleArrayChange = (e, arrayName) => {
    e.preventDefault();
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [arrayName]: [...prevProfile[arrayName], value],
    }));
    e.target.value = '';
  };

  const handleArrayRemove = (index, arrayName) => {
    e.preventDefault();
    setProfile((prevProfile) => ({
      ...prevProfile,
      [arrayName]: prevProfile[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', profile.title);
    formData.append('userId', userId);
    formData.append('email', profile.email);
    formData.append('contactNumber', profile.contactNumber);
    formData.append('companyFounded', profile.companyFounded);
    formData.append('shortDescription', profile.shortDescription);
    formData.append('bio', profile.bio);
    formData.append('gender', profile.gender);
    formData.append('birthdate', profile.birthdate);
    formData.append('location', profile.location);
    formData.append('returnOnInvestment', profile.returnOnInvestment);
    formData.append('totalInvestments', profile.totalInvestments);
    formData.append('totalfundInvested', profile.totalfundInvested);
    formData.append('averageReturnOnInvestment', profile.averageReturnOnInvestment);
    formData.append('yearsOfExperience', profile.yearsOfExperience);
    profile.geographicPreference.forEach((preference) => {
      formData.append('geographicPreference', preference);
    });
    profile.exitHistory.forEach((exit) => {
      formData.append('exitHistory', exit);
    });
    profile.keyAchievements.forEach((achievement) => {
      formData.append('keyAchievements', achievement);
    });
   
    formData.append('investmentRange', profile.investmentRange);
    profile.topInvestments.forEach((investment) => {
      formData.append('topInvestments', investment);
    });
    formData.append('profilePhoto', profile.profilePhoto);

    try {
      await axios.post('/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle successful response
      console.log('Profile updated successfully');
      navigate("/");
      
    } catch (error) {
      // Handle error response
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Edit Profile</h1>

      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-blue-600 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={profile.title || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={profile.contactNumber || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Contact Number"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Location"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={profile.birthdate || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Bio</label>
            <input
              type="text"
              name="bio"
              value={profile.bio || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="bio"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Gender</label>
            <select
              name="gender"
              value={profile.gender || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Investment Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Investment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-blue-600 font-medium">Total Investments</label>
            <input
              type="number"
              name="totalInvestments"
              value={profile.totalInvestments || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Total Investments"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Total Fund Invested</label>
            <input
              type="number"
              name="totalfundInvested"
              value={profile.totalfundInvested || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Total Fund Invested"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Investment Range</label>
            <input
              type="text"
              name="investmentRange"
              value={profile.investmentRange || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Investment Range"
            />
          </div>
          {/* Investment Stage */}
        
          <div>
            <label className="text-blue-600 font-medium">Return on Investment</label>
            <input
              type="number"
              name="returnOnInvestment"
              value={profile.returnOnInvestment || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ROI (%)"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Average ROI</label>
            <input
              type="number"
              name="averageReturnOnInvestment"
              value={profile.averageReturnOnInvestment || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Average ROI (%)"
            />
          </div>
          <div>
            <label className="text-blue-600 font-medium">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={profile.yearsOfExperience || ''}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Years of Experience"
            />
          </div>
        </div>
      </div>

      {/* Geographic Preferences */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Geographic Preferences</h2>
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full mb-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add geographic preference"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleArrayChange(e, 'geographicPreference');
          }}
        />
        <div>
          {profile.geographicPreference.map((preference, index) => (
            <div key={index} className="bg-green-100 p-3 rounded-md flex justify-between items-center mb-2">
              <span className="text-green-600">{preference}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove(index, 'geographicPreference')}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {/*Industry of interest */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Industry of Interest</h2>
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full mb-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add industry of interest"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleArrayChange(e, 'industriesOfInterest');
          }}
        />
        <div>
          {profile.industriesOfInterest.map((preference, index) => (
            <div key={index} className="bg-green-100 p-3 rounded-md flex justify-between items-center mb-2">
              <span className="text-green-600">{preference}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove(index, 'industriesOfInterest')}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Profile Photo */}
      <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Profile Photo</h2>
          <input
            type="file"
         name="profilePhoto"
          onChange={handleInputChange}
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
     </div>


      {/* Exit History */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Exit History</h2>
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full mb-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add exit history entry"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleArrayChange(e, 'exitHistory');
          }}
        />
        <div>
          {profile.exitHistory.map((exit, index) => (
            <div key={index} className="bg-green-100 p-3 rounded-md flex justify-between items-center mb-2">
              <span className="text-green-600">{exit}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove(index, 'exitHistory')}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {/*top investments*/}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Top investments</h2>
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full mb-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add top investment"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleArrayChange(e, 'topInvestments');
          }}
        />
        <div>
          {profile.topInvestments.map((exit, index) => (
            <div key={index} className="bg-green-100 p-3 rounded-md flex justify-between items-center mb-2">
              <span className="text-green-600">{exit}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove(index, 'topInvestments')}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Key Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Key Achievements</h2>
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full mb-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add key achievement"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleArrayChange(e, 'keyAchievements');
          }}
        />
        <div>
          {profile.keyAchievements.map((achievement, index) => (
            <div key={index} className="bg-green-100 p-3 rounded-md flex justify-between items-center mb-2">
              <span className="text-green-600">{achievement}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove(index, 'keyAchievements')}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button type="submit"className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full font-semibold">
        Save Profile
      </button>
    </form>
  );
};

export default EditProfilePage;