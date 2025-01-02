// Tạo sự kiện
const EventService = require('../services/event.service');
const grpc = require("@grpc/grpc-js");

/**
 * Create event
 * @param payload
 * @returns {Promise<{error: null, data: *}|{error: *, message: string}>}
 */
const createEventUseCase = async (payload) => {
    const {title, description, location, date, tickets} = payload;

    try {
        const newEvent = await EventService.create({
            title,
            description,
            location,
            date,
            tickets,
        });




        return {
            error: null,
            data: newEvent
        }
    } catch (e) {
        return {
            error: grpc.status.ALREADY_EXISTS,
            message: 'EVENT_EXISTS'
        }
    }
};

module.exports = {
    createEventUseCase
}