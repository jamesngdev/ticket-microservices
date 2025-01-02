const UserRepository = require('../../domain/repositories/user.repository');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const grpc = require("@grpc/grpc-js");
const JWT_SECRET = require('./../../config').config.jwtSecret;

/**
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {error|Object}
 */
async function registerUseCase(payload) {
    const {username, email, password} = payload;

    // add or username
    const existingUser = await UserRepository.findOne({
        where: [{
            username: username
        }, {
            email: email
        }]
    });
    if (existingUser) {
        return {
            error:  grpc.status.ALREADY_EXISTS,
            message: 'USER_EXISTS'
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = UserRepository.create({
        username,
        email,
        password: hashedPassword,
        status: 'active', // Default status
    });

    await UserRepository.save(user);

    return {
        error: null,
        data: user
    };
}

module.exports = {
    registerUseCase
}