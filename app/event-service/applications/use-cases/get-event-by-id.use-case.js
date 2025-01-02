// Tạo sự kiện
const EventService = require('../services/event.service');
const grpc = require("@grpc/grpc-js");

/**
 * Get event by id
 * @param eventId string
 * @returns {Promise<{error: null, data: *}|{error: *, message: string}>}
 */
const getEventByIdUseCase = async (eventId) => {

    try {
        const event = await EventService.findById(eventId);
        // convert to plain object
        return {
            error: null,
            data: event
        }
    } catch (e) {
        return {
            error: grpc.status.NOT_FOUND,
            message: "Event not found"
        }
    }
};

module.exports = {
    getEventByIdUseCase
}