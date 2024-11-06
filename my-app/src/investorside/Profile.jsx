import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import IHeader from './IHeader';

const InvestorProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        console.log("User ID:", userId);
        localStorage.setItem('userId', userId);
        const response = await axios.get('http://localhost:3000/profile', {
          params: { userId },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Sample data for investments chart
  const investmentData = [
    { month: 'Jan', amount: 150000 },
    { month: 'Feb', amount: 200000 },
    { month: 'Mar', amount: 180000 },
    { month: 'Apr', amount: 250000 },
    { month: 'May', amount: 300000 },
    { month: 'Jun', amount: 280000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <IHeader/>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900"></h1>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-orange-400 via-blue-500 to-green-500">
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-black bg-opacity-30 backdrop-blur-sm">
              <div className="flex items-end space-x-6">
                <img
                  src={profile.profilePhoto || '/api/placeholder/120/120'}
                  alt={profile.title}
                  className="w-24 h-24 rounded-lg border-4 border-white shadow-lg"
                />
                <div className="pb-4 text-white">
                  <h2 className="text-2xl font-bold">{profile.title}</h2>
                  <p className="mt-1 text-white/90">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-sm border border-orange-100">
                <div className="text-sm text-gray-600 mb-1">Total Investments</div>
                <div className="text-2xl font-bold text-orange-700">{profile.totalInvestments}</div>
                <div className="mt-2 text-sm text-orange-600">+12% from last year</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="text-sm text-gray-600 mb-1">Funds Invested</div>
                <div className="text-2xl font-bold text-blue-700">${profile.totalFundsInvested.toLocaleString()}</div>
                <div className="mt-2 text-sm text-blue-600">+8% from last month</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-sm border border-green-100">
                <div className="text-sm text-gray-600 mb-1">Avg. ROI</div>
                <div className="text-2xl font-bold text-green-700">{profile.averageReturnOnInvestment}%</div>
                <div className="mt-2 text-sm text-green-600">Above market average</div>
              </div>
            </div>

            {/* Investment Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Timeline</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      dot={{ fill: '#f97316' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Investments */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Investments</h3>
              <div className="space-y-4">
                {profile.topInvestments.map((investment, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{investment}</span>
                        <span className="text-sm font-medium text-gray-500">
                          {100 - (index * 15)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${100 - (index * 15)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* About */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Investment Preferences */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Preferences</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.industriesOfInterest.map((industry, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Range</h4>
                  <p className="text-gray-600">{profile.investmentRange}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Geographic Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.geographicPreference.map((location, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profile.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {profile.contactNumber}
                </div>
              </div>
            </div>

            {/* Exit History */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exit History</h3>
              <div className="space-y-3">
                {profile.exitHistory.map((exit, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-white rounded-lg text-gray-700 border border-green-100">
                    {exit}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
              <ul className="space-y-2">
                {profile.keyAchievements.map((achievement, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorProfilePage;