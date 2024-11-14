import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageCircle, Loader, AlertCircle } from "lucide-react";
import './AcceptedInvestors.css'; // Assuming you'll create a CSS file for styling
import Header from '../search_investors/Header';

const AcceptedInvestors = () => {

    const startupId = localStorage.getItem('userId'); // Hardcoded startupId
    const [investors, setInvestors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedInvestor, setSelectedInvestor] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);

    useEffect(() => {
        const fetchInvestors = async () => {
            try {
                const response = await axios.get(`/api/investors/${startupId}`);
                if (response.data.success) {
                    setInvestors(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('An error occurred while fetching investors.');
            } finally {
                setLoading(false);
            }
        };

        fetchInvestors();
    }, [startupId]);

    const fetchMessages = async (investorId) => {
        setSelectedInvestor(investorId);
        setShowChat(true);
        setMessages([]);

        try {
            const response = await axios.get(`/api/messages`, {
                params: {
                    investor_id: investorId,
                    startup_id: startupId,
                },
            });
            if (response.data.success) {
                setMessages(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || sendingMessage) return;

        setSendingMessage(true);
        try {
            const response = await axios.post(`/api/messages`, {
                investor_id: selectedInvestor,
                startup_id: startupId,
                message: newMessage,
            });
            if (response.data.success) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    response.data.data,
                ]);
                setNewMessage('');
            }
        } catch (err) {
            console.error('Error sending message:', err);
        } finally {
            setSendingMessage(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <Loader className="h-6 w-6 animate-spin" />
                <span>Loading investors...</span>
            </div>
        );
    }

    return (
        <>
        <Header></Header>
        <div className="flex h-screen bg-gray-50">
            <div className={`w-full  border-r bg-white`}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Accepted Investors</h2>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 text-red-800">
                                <AlertCircle className="h-5 w-5" />
                                <p>{error}</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4 mr-[10%]">
                        {investors.map(investor => (
                            <div 
                                key={investor.investor_id}
                                onClick={() => fetchMessages(investor.investor_id)}
                                className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-2">
                                    <img
                                        src={investor.profilePhoto}
                                        alt={investor.investor_name}
                                        className="h-12 w-12 rounded-full mr-3"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {investor.investor_name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{investor.bio}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 ml-[4%] text-sm">Investment: {investor.proposed_investment}</p>
                                <p className="text-gray-600 ml-[4%] text-sm">Equity Asked: {investor.equity_asked}</p>
                            </div>
                        ))}

                        {investors.length === 0 && !error && (
                            <div className="text-center text-gray-500 py-8">
                                No accepted investors found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showChat && (
                <div className="w-[70%] flex flex-col bg-white">
                    <div className="p-4 border-b">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-gray-600" />
                            <h3 className="text-xl font-semibold text-gray-800">
                                Chat with {selectedInvestor?.investor_name}
                            </h3>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={message._id || index}
                                className={`flex ${message.investor_id === selectedInvestor.investor_id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${message.investor_id === selectedInvestor.investor_id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    <p>{message.message}</p>
                                    <span className="text-xs opacity-75 mt-1 block">
                                        {new Date(message.timestamp).toLocaleString()}
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
                                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${sendingMessage ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                            >
                                {sendingMessage ? (
                                    <div className="flex items-center space-x-2">
                                        <Loader className="h-4 w-4 animate-spin" />
                                        <span>Sending...</span>
                                    </div>
                                ) : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default AcceptedInvestors;
