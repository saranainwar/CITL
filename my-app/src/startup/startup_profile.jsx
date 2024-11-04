import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios'; // Add this import
import { useNavigate } from 'react-router-dom';
const EditSProfile = () => {
  // Fix the initial state structure - remove the array wrapper
  const [personalDetail, setPersonalDetail] = useState({
    title: '',
    shortDescription: '',
    bio: '',
    gender: '',
    birthdate: '',
    location: '',
    email: '',
    phoneNumber: ''
  });

  const [companyDetail, setCompanyDetail] = useState({
    companyFounded: '',
    returnOfInvestment: '',
    mission: '',
    companyDescription: '',
    grossMargin: '',
    netMargin: '',
    ebitda: '',
    lifetimeSales: '',
    companyValuation: ''
  });

  const [investors, setInvestors] = useState([{ name: '', amount: '' }]);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handlePersonalDetailChange = (field, value) => {
    setPersonalDetail(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompanyDetailChange = (field, value) => {
    setCompanyDetail(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addInvestor = () => {
    setInvestors([...investors, { name: '', amount: '' }]);
  };

  const removeInvestor = (index) => {
    setInvestors(investors.filter((_, i) => i !== index));
  };

  const handleInvestorChange = (index, field, value) => {
    const updatedInvestors = investors.map((investor, i) => {
      if (i === index) {
        return { ...investor, [field]: value };
      }
      return investor;
    });
    setInvestors(updatedInvestors);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('personalDetail', JSON.stringify(personalDetail));
    formData.append('companyDetail', JSON.stringify(companyDetail));
    formData.append('investors', JSON.stringify(investors));
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }
    

    try {
      const response = await axios.post('http://localhost:3000/startupProfile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 201) {
        alert('Profile updated successfully');
        // Reset form or redirect user
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const personalDetails = [
    { label: 'Title', name: 'title' },
    { label: 'Short Description', name: 'shortDescription' },
    { label: 'Bio', name: 'bio', multiline: true },
    { label: 'Gender', name: 'gender', halfWidth: true },
    { label: 'Birthdate', name: 'birthdate', halfWidth: true },
    { label: 'Location', name: 'location' },
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phoneNumber' },
  ];

  const companyDetails = [
    { label: 'Company Founded', name: 'companyFounded', type: 'date' },
    { label: 'Return of Investment', name: 'returnOfInvestment', type: 'number' },
    { label: 'Mission', name: 'mission', multiline: true },
    { label: 'Company Description', name: 'companyDescription', multiline: true },
    { label: 'Gross Margin (%)', name: 'grossMargin', type: 'number', halfWidth: true },
    { label: 'Net Margin (%)', name: 'netMargin', type: 'number', halfWidth: true },
    { label: 'EBITDA', name: 'ebitda', type: 'number' },
    { label: 'Lifetime Sales', name: 'lifetimeSales', type: 'number' },
    { label: 'Company Valuation', name: 'companyValuation', type: 'number' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Edit Profile</h1>
          <p className="text-orange-600">Update your personal and company information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo Section */}
          <section className="bg-white backdrop-blur-lg bg-opacity-90 p-8 rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-800 mb-8 flex items-center">
              <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
              Profile Photo
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
          </section>

          {/* Personal Information Section */}
          <section className="bg-white backdrop-blur-lg bg-opacity-90 p-8 rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-800 mb-8 flex items-center">
              <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {personalDetails.map((field) => (
                <div key={field.name} className={field.multiline || !field.halfWidth ? 'sm:col-span-2' : 'sm:col-span-1'}>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      name={field.name}
                      rows={4}
                      value={personalDetail[field.name]}
                      onChange={(e) => handlePersonalDetailChange(field.name, e.target.value)}
                      className="w-full rounded-xl border-purple-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white bg-opacity-50 transition-all duration-200"
                    />
                  ) : (
                    <input
                      type={field.name === 'email' ? 'email' : field.name === 'phoneNumber' ? 'tel' : field.name === 'birthdate' ? 'date' : 'text'}
                      name={field.name}
                      value={personalDetail[field.name]}
                      onChange={(e) => handlePersonalDetailChange(field.name, e.target.value)}
                      className="w-full rounded-xl border-purple-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white bg-opacity-50 transition-all duration-200"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Company Details Section */}
          <section className="bg-white backdrop-blur-lg bg-opacity-90 p-8 rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-800 mb-8 flex items-center">
              <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
              Company Details
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {companyDetails.map((field) => (
                <div key={field.name} className={field.multiline || !field.halfWidth ? 'sm:col-span-2' : 'sm:col-span-1'}>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      name={field.name}
                      rows={4}
                      value={companyDetail[field.name]}
                      onChange={(e) => handleCompanyDetailChange(field.name, e.target.value)}
                      className="w-full rounded-xl border-purple-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white bg-opacity-50 transition-all duration-200"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={companyDetail[field.name]}
                      onChange={(e) => handleCompanyDetailChange(field.name, e.target.value)}
                      className="w-full rounded-xl border-purple-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white bg-opacity-50 transition-all duration-200"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Investors Section */}
          <section className="bg-white backdrop-blur-lg bg-opacity-90 p-8 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-purple-800 flex items-center">
                <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
                Investors
              </h2>
              <button
                type="button"
                onClick={addInvestor}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Investor
              </button>
            </div>

            <div className="space-y-4">
              {investors.map((investor, index) => (
                <div key={index} className="p-6 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        Investor Name
                      </label>
                      <input
                        type="text"
                        value={investor.name}
                        onChange={(e) => handleInvestorChange(index, 'name', e.target.value)}
                        className="w-full rounded-xl border-purple-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white bg-opacity-50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-purple-700 mb-2">
                          Investment Amount
                        </label>
                        <input
                          type="number"
                          value={investor.amount}
                          onChange={(e) => handleInvestorChange(index, 'amount', e.target.value)}
                          className="w-full rounded-xl border-purple-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white bg-opacity-50"
                        />
                      </div>
                      {investors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInvestor(index)}
                          className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-8">
            <button
              type="button"
              className="px-6 py-3 border border-purple-200 rounded-xl text-sm font-medium text-purple-700 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditSProfile;