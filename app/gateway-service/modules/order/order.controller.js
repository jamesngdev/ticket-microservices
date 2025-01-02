const {getGrpcClient} = require("../../../../libs/core/grpc-client");
const {errorResponse, successResponse} = require("../../utils/response");
const client = getGrpcClient('order'); // gRPC client for the event service

// Create an order
const createOrder = async (req, res) => {
    const payload = req.body;

    client.createOrder(payload, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'Event created successfully');
        }
    });
}

const getOrder = (req, res) => {
    const orderId = req.params.id;
    client.getOrder({orderId}, (error, response) => {
        if (error) {
            errorResponse(res, error.message);
        } else {
            successResponse(res, response, 'Get order successfully');
        }
    });
}


module.exports = {
    createOrder,
    getOrder
}