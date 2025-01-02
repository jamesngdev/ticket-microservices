const EventRepository = require('../../domain/repositories/user.repository');
const errorCodes = require("../../shared/constants/error-codes");

class EventService {

    /**
     * Create a new event
     * @param {Object} eventData - The data for the new event
     * @returns {Object} - The created event
     */
    create(eventData) {
        return EventRepository.create(eventData);
    }

    /**
     * Find an event by ID
     * @param {String} eventId - The ID of the event to find
     * @returns {Object|null} - The event, or null if not found
     */
    findById(eventId) {
        return EventRepository.findById(eventId);
    }


    /**
     * Find all events
     * @returns {Promise<Array>}
     */
    async getAllEvents() {
        return EventRepository.findAll();
    }


    /**
     * Update an event
     * @param eventId
     * @param updateData
     * @returns {Promise<Object|null>}
     */
    async updateEvent(eventId, updateData) {
        return EventRepository.updateById(eventId, updateData);
    }

    /**
     * Delete an event
     * @param eventId
     * @returns {Promise<Object>}
     */
    async deleteEvent(eventId) {
        const deletedEvent = await EventRepository.deleteById(eventId);
        if (!deletedEvent) {
            throw new Error(errorCodes.EVENT_NOT_FOUND);
        }
        return deletedEvent;
    }
}

module.exports = new EventService();