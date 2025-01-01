const {services} = require('../../libs/core/config');
const {createGrpcServer} = require("../../libs/core/grpc-server");
const configs = services.user;
const grpc = require('@grpc/grpc-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {AppDataSource} = require('./db/connection'); // TypeORM database connection

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL and TypeORM is initialized!');
    })
    .catch((error) => {
        console.error('Error during TypeORM DataSource initialization:', error);
    });

const User = require('./db/entity/User'); // User Entity


// Implement gRPC methods
const methods = {
    // Login method
    login: async (call, callback) => {
        const {email, password} = call.request;
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({where: {email}});

            if (!user) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'User not found',
                });
            }

            // Check if the password is correct
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return callback({
                    code: grpc.status.UNAUTHENTICATED,
                    details: 'Invalid password',
                });
            }

            // Generate JWT token
            const jwtToken = jwt.sign({userId: user.userId}, configs.config.jwtSecret, {expiresIn: '1h'});
            callback(null, {jwt_token: jwtToken});
        } catch (err) {
            console.error(err);
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error',
            });
        }
    },

    // Register method
    register: async (call, callback) => {
        const {username, email, password} = call.request;
        try {
            const userRepository = AppDataSource.getRepository(User);

            // Check if the email is already registered
            const existingUser = await userRepository.findOne({where: {email}});
            if (existingUser) {
                return callback({
                    code: grpc.status.ALREADY_EXISTS,
                    details: 'Email already registered',
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user instance
            const user = userRepository.create({
                username,
                email,
                password: hashedPassword,
                status: 'active', // Default status
            });

            // Save the user to the database
            await userRepository.save(user);

            callback(null, {message: 'User registered successfully'});
        } catch (err) {
            console.error(err);
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error',
            });
        }
    },

    // GetUserById method
    getUserById: async (call, callback) => {
        const {userId} = call.request;
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({where: {userId}});

            if (!user) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'User not found',
                });
            }

            callback(null, {
                userId: user.userId,
                username: user.username,
                email: user.email,
                status: user.status,
            });
        } catch (err) {
            console.error(err);
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error',
            });
        }
    },
};


createGrpcServer(configs, methods)