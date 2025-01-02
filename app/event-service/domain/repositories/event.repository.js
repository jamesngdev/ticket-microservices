const Event = require('../entities/Event');
const mongoose = require("mongoose"); // Mongoose Event model

class EventRepository {

    /**
     * @typedef {Object} Event
     *
     */
    static async create(eventData) {
        return Event.create(eventData);
    }

    /**
     * Find event by ID
     * @param {String} id - Event ID
     * @returns {Promise<Object>} - Event document or null if not found
     */
    static async findById(id) {
        const objectId = new mongoose.Types.ObjectId(id);
        return Event.findById(objectId).exec();
    }

    /**
     * Update ticket quantities for an event
     * @param {String} id - Event ID
     * @param {Array} items - Array of ticket updates (e.g., [{ ticketId, quantity }])
     * @returns {Promise<Object>} - Updated event or null if not found
     */
    static async updateTicketQuantity(id, items) {
        const event = await this.findById(id);
        if (!event) {
            return null;
        }

        // Update ticket quantities
        event.tickets = event.tickets.map((ticket) => {
            const item = items.find((item) => {
                return new mongoose.Types.ObjectId(item.ticketId).equals(ticket._id);
            });
            if (item) {
                ticket.remaining_quantity -= item.quantity;
            }
            return ticket;
        });

        // console.log(event.tickets);

        // Save updated event
        return event.save();
    }

    /**
     * Check if the event is overbooked
     * @param {String} id - Event ID
     * @param {Array} items - Array of ticket reservations (e.g., [{ ticketId, quantity }])
     * @returns {Promise<Boolean>} - true if overbooked, false otherwise
     */
    static async isOverBooked(id, items) {
        const event = await this.findById(id);
        if (!event) {
            return true; // Overbooked if event doesn't exist
        }

        // Check if any ticket is overbooked
        return event.tickets.some((ticket) => {
            const item = items.find((item) => {
                return new mongoose.Types.ObjectId(item.ticketId).equals(ticket._id);
            });
            if (item) {
                return ticket.remaining_quantity < item.quantity;
            }
            return false;
        });
    }
}

module.exports = EventRepository;