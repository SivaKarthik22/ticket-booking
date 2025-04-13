const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'show',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    seats: {
        type: Array,
        required: true,
    },
    transactionId : {
        type: String,
        required: true,
    }
}, {timestamps: true});

const BookingModel = mongoose.model('booking', bookingSchema);

module.exports = BookingModel;