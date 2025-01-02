const {getDetail} = require("../../domain/repositories/order.repository");
const grpc = require("@grpc/grpc-js");

module.exports = async function (orderId) {
    console.log('Get order use case', orderId);
    const order = await getDetail(orderId);

    if (!order) {
        return {
            error: grpc.status.NOT_FOUND, message: 'Order not found', data: null
        }
    }

    return {
        error: null, message: 'Get order successfully', data: order
    }
}