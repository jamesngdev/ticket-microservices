const {DataSource} = require('typeorm');
const User = require('./entity/User'); // Path to your User entity file
const {services} = require('../../../libs/core/config');
const config = services.user;

const AppDataSource = new DataSource({
    type: config.database.type, // Database type
    host: config.database.host, // Database host
    port: config.database.port, // Database port
    username: config.database.username, // Database username
    password: config.database.password, // Database password
    database: config.database.database, // Database name
    synchronize: true,
    logging: true,
    entities: [User],
});

module.exports = {AppDataSource};