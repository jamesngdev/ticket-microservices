const EventRepository = require('../../domain/repositories/event.repository');

async function orderCreatedUseCase(order) {
    const {eventId, items} = order;

    // 1. Kiểm tra sự tồn tại của event
    const event = await EventRepository.findById(eventId);
    if (!event) {
        return {
            error: 'EVENT_NOT_FOUND',
            message: 'Event not found'
        }
    }

    // 2. Kiểm tra số lượng vé đã đặt có vượt quá số lượng vé của event không
    const isOverBooked = await EventRepository.isOverBooked(eventId, items);
    if (isOverBooked) {
        return {
            error: 'OVER_BOOKED',
            message: 'Tickets are over booked'
        }
    }

    // 3. Cập nhật số lượng vé của event
    await EventRepository.updateTicketQuantity(eventId, items);
    return {
        error: null,
        message: 'Order created successfully'
    }
}

module.exports = {
    orderCreatedUseCase
}