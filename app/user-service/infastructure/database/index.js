const {DataSource} = require('typeorm');
const config = require('../../config/index');
const entities = require('./../../domain/entities');

const AppDataSource = new DataSource({
    type: config.database.type, // Database type
    host: config.database.host, // Database host
    port: config.database.port, // Database port
    username: config.database.username, // Database username
    password: config.database.password, // Database password
    database: config.database.database, // Database name
    synchronize: true,
    logging: true,
    entities: entities,
});

module.exports = {AppDataSource};