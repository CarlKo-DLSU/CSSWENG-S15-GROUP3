const mongoose = require("mongoose");

const newEventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        requied: true
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