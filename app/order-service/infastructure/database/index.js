const {DataSource} = require('typeorm');
const {config} = require('../../config/index');
const Order = require('./../../domain/entities/Order');
const OrderItem = require('./../../domain/entities/OrderItem');

const AppDataSource = new DataSource({
    type: config.database.type, // Database type
    host: config.database.host, // Database host
    port: config.database.port, // Database port
    username: config.database.username, // Database username
    password: config.database.password, // Database password
    database: config.database.database, // Database name
    synchronize: true,
    logging: true,
    entities: [
        Order,
        OrderItem
    ]
});

module.exports = {AppDataSource};