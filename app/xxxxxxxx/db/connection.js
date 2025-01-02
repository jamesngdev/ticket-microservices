const mongoose = require('mongoose');
const { services } = require('../../../libs/core/config');

const connectMongoDB = async () => {
    try {
        const { connectionUri } = services.event.database;

        await mongoose.connect(connectionUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = { connectMongoDB };