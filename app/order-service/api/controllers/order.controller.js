const createOrderUseCase = require("../../applications/use-cases/create-order.use-case");


exports.createOrder = async (call, callback) => {
    const payload = call.request;

    const {error, message, data} = await createOrderUseCase(payload)

    if (error) {
        return callback({
            code: error,
            details: message
        });
    }

    callback(null, {orderId: data.orderId, message: 'Order created successfully'});
}
