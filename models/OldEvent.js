const mongoose = require("mongoose");

const oldEventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: "placeholder.img"
    },
    album: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model("OldEvent", oldEventSchema);