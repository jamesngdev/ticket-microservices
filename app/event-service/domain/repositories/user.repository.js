const Event = require('../entities/Event'); // Path to your Event model

class EventRepository {
    /**
     * Create a new event
     * @param {Object} eventData - The data for the new event
     * @returns {Object} - The created event
     */
    create(eventData) {
        const event = new Event(eventData);
        return event.save();
    }

    /**
     * Find an event by ID
     * @param {String} eventId - The ID of the event to find
     * @returns {Object|null} - The event, or null if not found
     */
    findById(eventId) {
        return Event.findById(eventId);
    }

    /**
     * Find all events
     * @returns {Array} - A list of all events
     */
    findAll() {
        return Event.find();
    }

    /**
     * Update an event by ID
     * @param {String} eventId - The ID of the event to update
     * @param {Object} updateData - The data to update the event with
     * @returns {Object|null} - The updated event, or null if not found
     */
    updateById(eventId, updateData) {
        return Event.findByIdAndUpdate(
            eventId,
            {...updateData, updated_at: Date.now()}, // Update the timestamp
            {new: true, runValidators: true} // Return the updated document
        );
    }

    /**
     * Delete an event by ID
     * @param {String} eventId - The ID of the event to delete
     * @returns {Object|null} - The deleted event, or null if not found
     */
    deleteById(eventId) {
        return Event.findByIdAndDelete(eventId);
    }
}

module.exports = new EventRepository();