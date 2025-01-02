const {createGrpcServer} = require("../../libs/core/grpc-server");
const config = require('./config')
const {connectMongoDB} = require("./infastructure/database");
const {createEvent, listEvents} = require("./api/controllers/event.controller");

connectMongoDB().then(() => {
    const methods = {
        createEvent: createEvent,
        // getEventById,
        // updateEvent,
        listEvents: listEvents
    };
    createGrpcServer(config, methods)
})
