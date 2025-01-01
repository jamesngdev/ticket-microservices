const express = require('express');
const {initGrpcClients} = require("../../libs/core/grpc-client");

initGrpcClients()

// Initialize Express app
const app = express();

const port = 3000;

// Middleware for JSON body parsing
app.use(express.json());

// Import the ticket router
// app.use('/ticket', require('./modules/ticket/ticket.router'));
app.use('/auth', require('./modules/auth/auth.router'));
app.use('/events', require('./modules/event/event.router'));

// Start the Express server
app.listen(port, () => {
    console.log(`Gateway service is running at http://localhost:${port}`);
});