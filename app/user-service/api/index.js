const {createGrpcServer} = require("../../../libs/core/grpc-server");
const config = require('../config')
const {AppDataSource} = require("../infastructure/database");

const userController = require('./controllers/user.controller');

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL and TypeORM is initialized!');
    })
    .catch((error) => {
        console.error('Error during TypeORM DataSource initialization:', error);
    });


createGrpcServer(config, {
    login: userController.login,
    register: userController.register
})