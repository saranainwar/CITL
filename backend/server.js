const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

// Store clients and their socket IDs
const clients = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for a client registering
  socket.on('register', (userId) => {
    clients[userId] = socket.id;
  });

  // Handle connect request sent from StartupConnect
  socket.on('sendConnectRequest', (requestData) => {
    io.emit('receiveConnectRequest', requestData);
  });

  // Handle accept or reject from InvestorConnect
  socket.on('acceptRequest', (data) => {
    io.emit('requestAccepted', data);
  });

  socket.on('rejectRequest', (data) => {
    io.emit('requestRejected', data);
  });

  // Remove the client from the connected clients list on disconnect
  socket.on('disconnect', () => {
    Object.keys(clients).forEach((key) => {
      if (clients[key] === socket.id) delete clients[key];
    });
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});