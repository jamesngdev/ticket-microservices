const {updateOrderStatus} = require("../../domain/repositories/order.repository");

module.exports = {
    ticketReservedUseCase: (orderId) => {
        console.log(`Ticket reserved for orderId: ${orderId}`);
        return updateOrderStatus(orderId, 'Reserved');
    },
    ticketReservationFailedUseCase: (orderId) => {
        console.log(`Ticket reservation failed for orderId: ${orderId}`);
        return updateOrderStatus(orderId, 'Failed');
    }
}