const mongoose = require('mongoose');
const config = require('../../config/index');

const connectMongoDB = async () => {
    try {
        const {connectionUri} = config.database;

        await mongoose.connect(connectionUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = {connectMongoDB};