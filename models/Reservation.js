const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
    className: String,
    url: String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
