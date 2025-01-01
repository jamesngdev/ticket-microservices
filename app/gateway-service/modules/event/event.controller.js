const {getGrpcClient} = require("../../../../libs/core/grpc-client");
const {errorResponse, successResponse} = require("../../utils/response");
const client = getGrpcClient('event'); // gRPC client for the event service

// Create an event
const createEvent = async (req, res) => {
    const {title, description, location, date, tickets} = req.body;

    client.createEvent({title, description, location, date, tickets}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'Event created successfully');
        }
    });
}

// Get an event by its ID
const getEventById = async (req, res) => {
    const {eventId} = req.params;

    client.getEventById({eventId}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'Event fetched successfully');
        }
    });
}

// Update an event
const updateEvent = async (req, res) => {
    const {eventId, title, description, location, date, tickets} = req.body;

    client.updateEvent({eventId, title, description, location, date, tickets}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'Event updated successfully');
        }
    });
}

// List all events
const listEvents = async (req, res) => {
    client.listEvents({}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response.events, 'Events fetched successfully');
        }
    });
}


module.exports = {
    createEvent,
    getEventById,
    updateEvent,
    listEvents
}