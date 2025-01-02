const UserRepository = require('../../domain/repositories/user.repository');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const grpc = require("@grpc/grpc-js");
const JWT_SECRET = require('./../../config').config.jwtSecret;

/**
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {error|Object}
 */
async function loginUseCase(payload) {
    const {email, password} = payload;
    const user = await UserRepository.findOne({where: {email}});
    if (!user) {
        return {
            error: grpc.status.NOT_FOUND,
            message: 'USER_NOT_FOUND'
        }
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return {
            error: grpc.status.INVALID_ARGUMENT,
            message: 'INVALID_PASSWORD',
        }
    }

    const jwtToken = jwt.sign({userId: user.userId}, JWT_SECRET, {expiresIn: '1h'});

    return {
        error: null,
        data: jwtToken
    };
}

module.exports = {
    login: loginUseCase
}