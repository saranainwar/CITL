import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from 'axios';
import Header from '../search_investors/Header';
import { useParams } from 'react-router-dom';
const Startup = () => {
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timelineData, setTimelineData] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        localStorage.setItem('userId', userId);
        const response = await axios.get(`http://localhost:3000/find/startups?userId=${userId}`);
        setStartupData(response.data);
        
        // Generate timeline data for the last 6 months
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const mockTimelineData = months.map((month, index) => ({
          name: month,
          grossMargin: (response.data.grossMargin + (Math.random() * 5 - 2.5))||0,
          netMargin:( response.data.netMargin + (Math.random() * 5 - 2.5))||0,
          ebitda: (response.data.ebitda + (Math.random() * 5 - 2.5))||0,
        }));
        setTimelineData(mockTimelineData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching startup data:', error);
        setLoading(false);
      }
    };
    fetchStartupData();
  }, []);

  const COLORS = ['#402e7a', '#c95827', '#ea9525'];

  const pieData = startupData ? [
    { name: 'Gross Margin', value: startupData.grossMargin||0 },
    { name: 'Net Margin', value: startupData.netMargin || 0},
    { name: 'EBITDA', value: startupData.ebitda || 0}
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     <Header></Header>
      
      {/* Hero Section */}
      <div className="bg-white shadow-lg rounded-lg mx-auto max-w-7xl mt-8 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            {startupData?.profilePhoto ? (
              <img
                src={startupData.profilePhoto}
                alt="Company Profile"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-[#402e7a]">{startupData?.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{startupData?.shortDescription}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">Founded</span>
                <p className="text-lg font-semibold text-[#402e7a]">
                  {startupData?.companyFounded ? new Date(startupData.companyFounded).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">Valuation</span>
                <p className="text-lg font-semibold text-[#402e7a]">
                  {startupData?.companyValuation ? `$${startupData.companyValuation.toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-w-7xl mt-8 p-8">
        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#402e7a] mb-6">Financial Metrics Timeline</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="grossMargin" 
                  stroke="#402e7a" 
                  name="Gross Margin"
                />
                <Line 
                  type="monotone" 
                  dataKey="netMargin" 
                  stroke="#c95827" 
                  name="Net Margin"
                />
                <Line 
                  type="monotone" 
                  dataKey="ebitda" 
                  stroke="#ea9525" 
                  name="EBITDA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#402e7a] mb-6">Financial Metrics Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#402e7a] mb-6">Current Financial Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Gross Margin', value: startupData?.grossMargin, color: '#402e7a' },
              { label: 'Net Margin', value: startupData?.netMargin, color: '#c95827' },
              { label: 'EBITDA', value: startupData?.ebitda, color: '#ea9525' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{metric.label}</span>
                <span className="font-bold" style={{ color: metric.color }}>
                  {metric.value ? `${metric.value}%` : 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Investors History */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#402e7a]">
              Investors on <span className="text-[#c95827]">Pitchers</span>
            </h2>
            <button className="text-[#ea9525] font-medium">View all</button>
          </div>
          <div className="space-y-4">
            {startupData?.investors?.map((investor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-[#402e7a]">{investor.name}</span>
                <span className="font-bold text-[#c95827]">
                  ${investor.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white shadow-lg rounded-lg mx-auto max-w-7xl mt-8 p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#402e7a] mb-6">About Us</h2>
        <div className="space-y-4">
          <p className="text-gray-700">{startupData?.mission || 'No mission statement available'}</p>
          <p className="text-gray-700">{startupData?.companyDescription || 'No company description available'}</p>
        </div>
      </div>
    </div>
  );
};

export default Startup;