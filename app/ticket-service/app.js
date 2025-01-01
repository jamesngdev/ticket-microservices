const {services} = require('../../libs/core/config');
const {createGrpcServer} = require("../../libs/core/grpc-server");
const configs = services.ticket;
const {AppDataSource} = require('./db/connection'); // TypeORM database connection

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL and TypeORM is initialized!');
    })
    .catch((error) => {
        console.error('Error during TypeORM DataSource initialization:', error);
    });

const User = require('./db/entity/Ticket');


// Implement gRPC methods
const methods = {};


createGrpcServer(configs, methods)