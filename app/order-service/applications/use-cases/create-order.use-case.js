const grpc = require("@grpc/grpc-js");
const {sendMessage} = require("../../infastructure/queue/producer");
const OrderRepository = require('./../../domain/repositories/order.repository');

/**
 * Create order use case
 * @payload {object} - Order details
 */
module.exports = async function (payload) {
    // 1. Ghi đơn hàng vào database với trạng thái PENDING
    const tickets = payload?.tickets || [];
    const totalPrice = tickets.reduce((acc, ticket) => acc + ticket.totalPrice, 0);
    const order = await OrderRepository.save({
        userId: payload.userId,
        eventId: payload.eventId,
        totalPrice: totalPrice,
        status: 'Pending',
        items: tickets.map(ticket => {
            return {
                ticketId: ticket.ticketId,
                ticketType: ticket.ticketType,
                quantity: ticket.quantity,
                unitPrice: ticket.unitPrice,
                totalPrice: ticket.totalPrice
            }
        })
    });

    if (!order) {
        return {
            error: grpc.status.INTERNAL,
            message: 'Failed to create order',
            data: null
        }
    }

    // 2. Gửi message tới ticket-service để cập nhật trạng thái của vé
    await sendMessage('order-events', {
        type: 'OrderCreated',
        data: {
            order,
        }
    })

    // 3. Trả về kết quả

    return {
        error: null,
        message: 'Create order successfully',
        data: {
            orderId: order.id
        }
    }
}