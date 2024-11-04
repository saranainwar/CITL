import { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight, Building2, Calendar, DollarSign, AlertCircle, Loader } from "lucide-react";
import { format } from 'date-fns';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3000'; // Update this to match your backend URL
axios.defaults.withCredentials = true;

const StartupDashboard = () => {
  const [investor_id] = useState('6724a1d7693efd5fd53f8bc9');
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/startup-requests', {
        params: {
          investor_id,
          status: 'accepted'
        }
      });

      if (response.data.success) {
        setStartups(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch startups');
      }
    } catch (error) {
      console.error('Error fetching startups:', error);
      setError(error.response?.data?.message || 'Failed to load startups. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartupClick = async (startup) => {
    setSelectedStartup(startup);
    setShowChat(true);
    setMessages([]);

    try {
      const response = await axios.get('/api/messages', {
        params: {
          startup_id: startup.startup_id,
          investor_id,
        }
      });

      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setError('Failed to load chat history. Please try again later.');
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sendingMessage) return;

    setSendingMessage(true);
    try {
      const response = await axios.post('/api/messages', {
        startup_id: selectedStartup.startup_id,
        investor_id,
        message: newMessage,
      });

      if (response.data.success) {
        setMessages([...messages, response.data.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading startups...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Startups List Panel */}
      <div className={`${showChat ? 'w-1/3' : 'w-full'} border-r bg-white`}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Accepted Startups</h2>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-4 mr-[10%]">
          {startups.map((startup) => (
            <div 
              key={startup._id}
              onClick={() => handleStartupClick(startup)}
              className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {startup.startup_name}
                </h3>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Valuation: ${startup.companyValuation?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Founded: {startup.companyFounded ? format(new Date(startup.companyFounded), 'MMM yyyy') : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Equity Offered: {startup.equity_offered}%</span>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {startup.shortDescription}
              </p>
            </div>
          ))}

          {startups.length === 0 && !error && (
            <div className="text-center text-gray-500 py-8">
              No accepted startups found
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div className="w-2/3 flex flex-col bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Chat with {selectedStartup?.startup_name}
              </h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message._id || index}
                className={`flex ${
                  message.investor_id === investor_id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.investor_id === investor_id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.message}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {format(new Date(message.timestamp), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No messages yet. Start the conversation!
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={sendingMessage}
              />
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage}
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${sendingMessage 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
              >
                {sendingMessage ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDashboard;
``
