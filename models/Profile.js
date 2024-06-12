const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        immutable: true
    }
})

module.exports = mongoose.model("Profile", profileSchema);