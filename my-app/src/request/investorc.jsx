
import { useState, useEffect } from 'react';
import axios from 'axios';
import IHeader from '../investorside/IHeader';

const InvestorConnect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startups, setStartups] = useState([]);
  const [connectedStartups, setConnectedStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStartup, setCurrentStartup] = useState(null);
  const [collectResponse, setCollectResponse] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [investmentDetails, setInvestmentDetails] = useState({
    message: '',
    proposed_investment: '',
    equity_asked: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const investorId = localStorage.getItem('userId');
        console.log(investorId);
        const startupsResponse = await axios.get(`http://localhost:3000/api/startupN/${investorId}`);
        const connectionsResponse = await axios.get(`http://localhost:3000/api/startup/${investorId}`);
        const collectRespons = await axios.get(`http://localhost:3000/api/startupreq/${investorId}`);
        setStartups(startupsResponse.data);
        setConnectedStartups(connectionsResponse.data);
        setCollectResponse(collectRespons.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Keep all existing handler functions exactly as they are
  const handleConnectClick = (startup) => {
    setCurrentStartup(startup);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentStartup(null);
    setInvestmentDetails({
      message: '',
      proposed_investment: '',
      equity_asked: ''
    });
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:3000/api/startupreq/${requestId}`, { status: 'rejected' });
      setCollectResponse(prevRequests => 
        prevRequests.map(request => 
          request._id === requestId 
            ? { ...request, status: 'rejected' } 
            : request
        )
      );
    } catch (error) {
      console.error('Error updating request status:', error);
      setError('Failed to update request status');
    }
  };

  const handleRequestStatusUpdate = async (requestId, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/startupreq/${requestId}`, { status });
      setCollectResponse(prevRequests => 
        prevRequests.map(request => 
          request._id === requestId 
            ? { ...request, status } 
            : request
        )
      );
    } catch (error) {
      console.error('Error updating request status:', error);
      setError('Failed to update request status');
    }
  };

  const handleAcceptRequest = (requestId) => {
    handleRequestStatusUpdate(requestId, 'accepted');
  };

  const handleConnect = async () => {
    try {
      const investorId = "6724a1d7693efd5fd53f8bc9";
      const requestData = {
        startupId: currentStartup._id,
        investorId: investorId,
        message: investmentDetails.message,
        funding_amount: Number(investmentDetails.proposed_investment),
        equity_offered: Number(investmentDetails.equity_asked),
        startup_name: currentStartup.title,
        status: 'pending'
      };

      const response = await axios.post('http://localhost:3000/api/startuprequest', requestData);
      
      if (response.status === 201) {
        setConnectedStartups(prev => [...prev, {
          ...currentStartup,
          ...requestData,
          _id: response.data.request._id
        }]);
        
        setStartups(prev => prev.filter(s => s._id !== currentStartup._id));
        handleDialogClose();
      }
    } catch (error) {
      console.error('Error connecting to startup:', error);
      setError('Failed to send connection request');
    }
  };

  const filteredStartups = startups.filter(startup =>
    startup?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup?.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <>
    <IHeader></IHeader>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Connect with Startups</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}


      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>



      <div className="mb-6 flex space-x-5 ">
        {['available', 'requests-sent', 'requests-received'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
             <div key={startup._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
             <h3 className="text-lg font-semibold mb-2">{startup.title}</h3>
             <p className="text-gray-600 mb-4 line-clamp-3">{startup.shortDescription}</p>
             <div className="flex items-center justify-between mb-4"> {/* Added margin-bottom for spacing */}
               <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                 {startup.location}
               </span>
             </div>
             <div> {/* New div for the button */}
               <button
                 onClick={() => handleConnectClick(startup)}
                 className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
               >
                 Connect
               </button>
             </div>
           </div>
           
            ))}
            {filteredStartups.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No startups found
              </div>
            )}
          </div>
        )}


{activeTab === 'requests-sent' && (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Startup Requests</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {connectedStartups.length > 0 ? (
            connectedStartups.map((request) => (
              <tr key={request._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">{request.startup_name || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${request.funding_amount?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.equity_offered || 'N/A'}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || 'N/A'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-8">
                No requests sent yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}




        {activeTab === 'requests-received' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectResponse.map((request) => (
              <div key={request._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{request.startup_id?.title || 'N/A'}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || 'N/A'}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">
                      Investment: ${request.proposed_investment?.toLocaleString() || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      Equity: {request.equity_asked || 'N/A'}%
                    </p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptRequest(request._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex-1"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex-1"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {collectResponse.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No requests received
              </div>
            )}
          </div>
        )}
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Connect with {currentStartup?.title}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows={4}
                  value={investmentDetails.message}
                  onChange={(e) => setInvestmentDetails(prev => ({
                    ...prev,
                    message: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduce yourself and explain your interest..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proposed Investment ($)</label>
                <input
                  type="number"
                  value={investmentDetails.proposed_investment}
                  onChange={(e) => setInvestmentDetails(prev => ({
                    ...prev,
                    proposed_investment: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Equity Asked (%)</label>
                <input
                  type="number"
                  value={investmentDetails.equity_asked}
                  onChange={(e) => setInvestmentDetails(prev => ({
                    ...prev,
                    equity_asked: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter percentage"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleDialogClose}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={!investmentDetails.message || 
                         !investmentDetails.proposed_investment || 
                         !investmentDetails.equity_asked}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default InvestorConnect;