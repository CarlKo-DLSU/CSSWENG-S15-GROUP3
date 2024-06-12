const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/CSSWENGS15")
.then(()=>{
    console.log("Successfully connected!");
})
.catch(()=>{
    console.log("Failed to connect!");
})

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

module.exports = mongoose.model("Profile", profileSchema);
module.exports = mongoose.model("NewEvent", newEventSchema);
module.exports = mongoose.model("OldEvent", oldEventSchema);