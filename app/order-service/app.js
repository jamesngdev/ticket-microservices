const {createGrpcServer} = require("../../libs/core/grpc-server");
const config = require('./config')
const {AppDataSource} = require("./infastructure/database");
const orderController = require("./api/controllers/order.controller");
const {listenTicketReserved} = require("./infastructure/queue/consumer");

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL and TypeORM is initialized!');
        listenTicketReserved()
        createGrpcServer(config, {
            createOrder: orderController.createOrder,
            getOrder: orderController.getOrder
        })
    })
    .catch((error) => {
        console.error('Error during TypeORM DataSource initialization:', error);
    });

