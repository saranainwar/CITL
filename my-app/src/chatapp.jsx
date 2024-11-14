// import  { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';


// const socket = io('http://localhost:4000'); // Connect to the Socket.io server on port 4000

// function ChatApp() {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Listen for incoming messages
//         socket.on('receiveMessage', (message) => {
//             setMessages((prevMessages) => [...prevMessages, `Other: ${message}`]);
//         });

//         // Clean up listener on unmount
//         return () => {
//             socket.off('receiveMessage');
//         };
//     }, []);

//     const sendMessage = () => {
//         if (message) {
//             socket.emit('sendMessage', message); // Emit message to server
//             setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
//             setMessage(''); // Clear input field
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <h1 className="text-3xl font-bold mb-5">Chat App</h1>
//             <div className="w-96 h-96 border border-gray-300 rounded-lg p-4 bg-white overflow-y-auto">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="my-1">{msg}</div>
//                 ))}
//             </div>
//             <div className="flex mt-4">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     className="border border-gray-300 rounded-lg p-2 w-72"
//                 />
//                 <button
//                     onClick={sendMessage}
//                     className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default ChatApp;


import  { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the Socket.io server on port 4000

function ChatApp() {
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Register the user with the server
        if (username) {
            socket.emit('register', username);
        }

        // Listen for incoming messages
        socket.on('receiveMessage', ({ message, sender, timestamp }) => {
            setMessages((prevMessages) => [...prevMessages, { message, sender, timestamp }]);
        });

        // Clean up listener on unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, [username]);

    const sendMessage = () => {
        if (message && recipient) {
            // Emit message to the server with recipient and sender info
            socket.emit('sendMessage', { message, recipient, sender: username });
            setMessages((prevMessages) => [...prevMessages, { message, sender: 'You', timestamp: new Date().toLocaleTimeString() }]);
            setMessage(''); // Clear input field
        }
    };

    const displayMessages = () => {
        return messages.map((msg, index) => (
            <div key={index} className="my-1">
                <strong>{msg.sender}</strong> [{msg.timestamp}]: {msg.message}
            </div>
        ));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-5">Chat App</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="border border-gray-300 rounded-lg p-2 mb-4 w-72"
            />
            <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient username"
                className="border border-gray-300 rounded-lg p-2 mb-4 w-72"
            />
            <div className="w-96 h-96 border border-gray-300 rounded-lg p-4 bg-white overflow-y-auto mb-4">
                {displayMessages()}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="border border-gray-300 rounded-lg p-2 w-72"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatApp;
