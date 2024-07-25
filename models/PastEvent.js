const mongoose = require('mongoose');

const pastEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cover: { type: String, required: true },
    description: { type: String},
    gallery: [String]
});

const PastEvent = mongoose.model('PastEvent', pastEventSchema);

module.exports = PastEvent;