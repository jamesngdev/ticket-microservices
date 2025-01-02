const {createGrpcServer} = require("../../libs/core/grpc-server");
const config = require('./config')
const {connectMongoDB} = require("./infastructure/database");
const {createEvent, listEvents, getEventById} = require("./api/controllers/event.controller");
const {startConsumer, listenOrderCreated} = require('./infastructure/queue/consumer');

connectMongoDB().then(() => {
    const methods = {
        createEvent: createEvent,
        getEventById,
        // updateEvent,
        listEvents: listEvents
    };
    createGrpcServer(config, methods)
    listenOrderCreated()
})
