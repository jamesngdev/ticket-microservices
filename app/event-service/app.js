const grpc = require('@grpc/grpc-js');
const Event = require('./db/entity/Event'); // Mongoose model
const {services} = require('../../libs/core/config');


// Tạo sự kiện
const createEvent = async (call, callback) => {
    const {title, description, location, date, tickets} = call.request;

    try {
        const newEvent = new Event({
            title,
            description,
            location,
            date,
            tickets,
        });

        await newEvent.save();

        callback(null, {message: 'Event created successfully', eventId: newEvent._id});
    } catch (err) {
        console.error(err);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Error creating event',
        });
    }
};

// Lấy thông tin sự kiện theo ID
const getEventById = async (call, callback) => {
    const {eventId} = call.request;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return callback({
                code: grpc.status.NOT_FOUND,
                details: 'Event not found',
            });
        }

        callback(null, {
            _id: event._id,
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            tickets: event.tickets,
        });
    } catch (err) {
        console.error(err);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Error fetching event',
        });
    }
};

// Cập nhật sự kiện
const updateEvent = async (call, callback) => {
    const {eventId, title, description, location, date, tickets} = call.request;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return callback({
                code: grpc.status.NOT_FOUND,
                details: 'Event not found',
            });
        }

        event.title = title;
        event.description = description;
        event.location = location;
        event.date = date;
        event.tickets = tickets;

        await event.save();

        callback(null, {message: 'Event updated successfully'});
    } catch (err) {
        console.error(err);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Error updating event',
        });
    }

};

const listEvents = async (call, callback) => {
    try {
        let events = await Event.find({});

        // Convert Mongoose object to plain object
        events = events.map(event => ({
            ...event.toObject(),
            eventId: event._id,
        }));


        if (!events.length) {
            return callback({
                code: grpc.status.NOT_FOUND,
                details: 'No events found',
            });
        }

        callback(null, {events});
    } catch (err) {
        console.error(err);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Internal server error',
        });
    }
}

// Tạo gRPC server
const methods = {
    createEvent,
    getEventById,
    updateEvent,
    listEvents
};

const grpcServer = require('../../libs/core/grpc-server');
const {connectMongoDB} = require("./db/connection");
connectMongoDB().then(() => {
    grpcServer.createGrpcServer(services.event, methods);
});