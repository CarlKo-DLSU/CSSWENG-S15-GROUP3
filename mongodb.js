const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/CSSWENGS15")
.then(()=>{
    console.log("MongoDB successfully connected!");
})
.catch(()=>{
    console.log("Failed to connect to MongoDB!");
})

// placeholder schemas, delete this + use /models files in future

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
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

const profiles = new mongoose.model("profileCollection", profileSchema)
const newEvents = new mongoose.model("newEventCollection", newEventSchema)
const oldEvents = new mongoose.model("oldEventCollection", oldEventSchema)

module.exports = profiles
module.exports = newEvents
module.exports = oldEvents