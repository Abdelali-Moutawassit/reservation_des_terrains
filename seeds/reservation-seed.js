const db = require('../config/database');
const Reservation = require('../models/Reservation');

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const d = date.getDate();

const reservations = [
    {
        title: 'Abia1',
        start: new Date(y, m, 1)
    },
    {
        title: 'Abia2',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false,
        className: 'info'
    },
];

const reservationInstances = reservations.map((res) => new Reservation(res));

Promise.all(reservationInstances.map((res) => res.save()))
    .then(() => {
        console.log('Réservations ajoutées avec succès.');
    })
    .catch((err) => {
        console.error(err);
    });
