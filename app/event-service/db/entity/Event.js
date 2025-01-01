const mongoose = require('mongoose');

// Định nghĩa Schema cho Event
const ticketSchema = new mongoose.Schema({
    type: String,
    price: Number,
    total_quantity: Number,
    remaining_quantity: Number,
});

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    tickets: [ticketSchema], // Lưu thông tin vé theo dạng mảng
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

// Tạo model từ schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;