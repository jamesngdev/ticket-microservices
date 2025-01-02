// Tạo sự kiện
const EventService = require('../services/event.service');
const grpc = require("@grpc/grpc-js");

const listEventUseCase = async (payload) => {
    try {
        const events = await EventService.getAllEvents();

        return {
            error: null,
            data: events
        }
    } catch (e) {
        return {
            error: grpc.status.ALREADY_EXISTS,
            message: 'EVENT_EXISTS'
        }
    }
};

module.exports = {
    listEventUseCase
}