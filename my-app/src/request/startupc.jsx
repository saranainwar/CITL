// 


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';
import Header from '../search_investors/Header';

const StartupConnect = () => {
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('investors');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [collectReq, setCollectReq] = useState([]);
  const [requestForm, setRequestForm] = useState({
    message: '',
    pitch_deck_url: '',
    funding_amount: '',
    equity_offered: ''
  });
  const [roiFilter, setRoiFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [favorites, setFavorites] = useState([]);

  const startupId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [requestsResponse, sentRequestsResponse, collectReqResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/investorK/${startupId}`),
          axios.get(`http://localhost:3000/api/investorrequest/startup/${startupId}`),
          axios.get(`http://localhost:3000/api/investorreq/${startupId}`)
        ]);
        
        setConnectionRequests(requestsResponse.data);
        setSentRequests(sentRequestsResponse.data);
        setCollectReq(collectReqResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setTimeout(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(interval);
  }, []);

  const handleRequestAction = async (requestId, action) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/investorrequest/${requestId}`, {
        status: action,
        startupId,
      });

      if (response.status === 200) {
        setConnectionRequests(prev =>
          prev.map(request =>
            request._id === requestId ? { ...request, status: action } : request
          )
        );
      }
    } catch (err) {
      console.error('Error updating request:', err);
      setError('Failed to update request');
    }
  };

  const handleConnect = (investor) => {
    setSelectedInvestor(investor);
    setShowRequestModal(true);
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/investorrequest', {
        startup_id: startupId,
        investor_id: selectedInvestor._id,
        investor_name: selectedInvestor.title,
        message: requestForm.message,
        pitch_deck_url: requestForm.pitch_deck_url,
        funding_amount: parseFloat(requestForm.funding_amount),
        equity_offered: parseFloat(requestForm.equity_offered)
      });

      if (response.status === 201) {
        setShowRequestModal(false);
        setRequestForm({
          message: '',
          pitch_deck_url: '',
          funding_amount: '',
          equity_offered: ''
        });
        
        const [updatedRequests, updatedSentRequests] = await Promise.all([
          axios.get(`http://localhost:3000/api/investorK/${startupId}`),
          axios.get(`http://localhost:3000/api/investorrequest/startup/${startupId}`)
        ]);
        
        setConnectionRequests(updatedRequests.data);
        setSentRequests(updatedSentRequests.data);
      }
    } catch (err) {
      console.error('Error sending connection request:', err);
      setError('Failed to send connection request');
    }
  };

  const toggleFavorite = (investorId) => {
    setFavorites(prev => 
      prev.includes(investorId) 
        ? prev.filter(id => id !== investorId)
        : [...prev, investorId]
    );
  };

  const filteredData = connectionRequests
    .filter(item =>
      (item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.message?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roiFilter === '' || item.returnOnInvestment >= parseFloat(roiFilter)) &&
      (locationFilter === '' || item.location.toLowerCase().includes(locationFilter.toLowerCase()))
    )
    .sort((a, b) => {
      if (favorites.includes(a._id) && !favorites.includes(b._id)) return -1;
      if (!favorites.includes(a._id) && favorites.includes(b._id)) return 1;
      return 0;
    });

  const filteredSentRequests = sentRequests.filter(item =>
    item?.investor?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Connect with Investors</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <input
              type="number"
              placeholder="Minimum ROI"
              value={roiFilter}
              onChange={e => setRoiFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('investors')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'investors'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Available Investors
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'requests'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Investment Requests
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'sent'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Sent Requests
          </button>
        </div>

        {activeTab === 'investors' && (
          <div>
            <div className='flex gap-3 mb-3'>
             <input
              type="number"
              placeholder="Minimum ROI"
              value={roiFilter}
              onChange={e => setRoiFilter(e.target.value)}
              className=" w-[40%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="w-[40%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
            {filteredData.map(investor => (
              <div key={investor._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{investor.title}</h3>
                    <button 
                      onClick={() => toggleFavorite(investor._id)}
                      className="text-gray-400  bg-white hover:text-red-500 hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`h-6 w-6 ${favorites.includes(investor._id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{investor.companyFounded}</p>
                  <div className="space-y-4">
                    <p className="text-sm">{investor.shortDescription}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Total Investments</p>
                        <p>{investor.totalInvestments}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Total Invested</p>
                        <p>${investor.totalfundInvested?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-semibold">ROI</p>
                        <p>{investor.returnOnInvestment}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p>{investor.location}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleConnect(investor)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No investors found
              </div>
            )}
          </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Investment Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {collectReq.map(request => (
                    <tr key={request._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.investor_id?.title || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {request.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${request.funding_amount?.toLocaleString() || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.equity_offered || 'N/A'}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-sm ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRequestAction(request._id, 'accepted')}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRequestAction(request._id, 

 'rejected')}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {collectReq.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No investment requests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sent' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sent Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Sent</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSentRequests.map(request => (
                    <tr key={request._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.investor_name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {request.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${request.proposed_investment?.toLocaleString() || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                        {request.equity_asked || 'N/A'}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-sm ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSentRequests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No sent requests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Connect with {selectedInvestor.title}</h2>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={requestForm.message}
                    onChange={e => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pitch Deck URL
                  </label>
                  <input
                    type="url"
                    value={requestForm.pitch_deck_url}
                    onChange={e => setRequestForm(prev => ({ ...prev, pitch_deck_url: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/pitch-deck"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Amount ($)
                  </label>
                  <input
                    type="number"
                    value={requestForm.funding_amount}
                    onChange={e => setRequestForm(prev => ({ ...prev, funding_amount: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="1000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equity Offered (%)
                  </label>
                  <input
                    type="number"
                    value={requestForm.equity_offered}
                    onChange={e => setRequestForm(prev => ({ ...prev, equity_offered: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Send Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StartupConnect;