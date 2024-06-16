const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
    mission: {
        type: String,
        default: "Delivering through with our customers and clients by organizing, planning, and executing successful events."
    },
    serviceImg: {
        type: [String],
        default: ["service1", "service2", "service3"]
    },
    serviceDesc: {
        type: [String],
        default: ["Event Management & Live Staging", "Creative Conceptualization", "Audio-Visual Presentation"]
    },
    visitTitle: {
        type: String,
        default: "SX MANILA"
    },
    visitDesc: {
        type: String,
        default: "POST - a group that holds and organizes music event productions.\n\nFrom electrifying concerts to soul-stirring festivals, our passion for music and dedication to innovation shine through every beat."
    }
})

const aboutUs = new mongoose.model("aboutUsCollection", aboutUsSchema)
module.exports = aboutUs