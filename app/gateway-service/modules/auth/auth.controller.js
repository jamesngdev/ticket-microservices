const {getGrpcClient} = require("../../../../libs/core/grpc-client");
const {errorResponse, successResponse} = require("../../utils/response");
const client = getGrpcClient('user');

const login = async (req, res) => {
    const {email, password} = req.body;

    client.login({email, password}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'Login successful');
        }
    });
}

const register = async (req, res) => {
    const {username, email, password} = req.body;
    client.register({username, email, password}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'User registered');
        }
    });
}

module.exports = {
    login,
    register
}