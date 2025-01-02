const createOrderUseCase = require("../../applications/use-cases/create-order.use-case");
const getOrderUseCase = require("../../applications/use-cases/get-order.use-case");

exports.createOrder = async (call, callback) => {
    const payload = call.request;

    const {error, message, data} = await createOrderUseCase(payload)

    if (error) {
        return callback({
            code: error, details: message
        });
    }

    callback(null, {orderId: data.orderId, message: 'Order created successfully'});
}

exports.getOrder = async (call, callback) => {
    const orderId = call.request.orderId;

    const {error, message, data} = await getOrderUseCase(orderId)

    if (error) {
        return callback({
            code: error, details: message
        });
    }

    callback(null, {
        order: {
            ...data,
            orderId: data.id,
            tickets: data.items.map(item => {
                return {
                    ticketId: item.ticketId,
                    ticketType: item.ticketType,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    totalPrice: item.totalPrice
                }
            })
        }

    });
}