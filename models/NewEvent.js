const mongoose = require("mongoose");

const newEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: "placeholder.img"
    }
})

const newEvents = new mongoose.model("newEventCollection", newEventSchema)
module.exports = newEvents