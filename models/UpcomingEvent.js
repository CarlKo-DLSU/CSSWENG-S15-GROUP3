const mongoose = require('mongoose');

const upcomingEventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    venue: String,
    merchLink: String,
    coverPhoto: String
});

const UpcomingEvent = mongoose.model('UpcomingEvent', upcomingEventSchema);

module.exports = UpcomingEvent;
