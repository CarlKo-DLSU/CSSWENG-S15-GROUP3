const mongoose = require("mongoose");

const upcomingEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    merchLink: { type: String, required: true },
    coverPhoto: { type: String, required: true } // New field for cover photo path
});

const UpcomingEvent = mongoose.model("UpcomingEvent", upcomingEventSchema);

module.exports = UpcomingEvent;
