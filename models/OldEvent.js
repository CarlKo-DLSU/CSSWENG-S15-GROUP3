// const mongoose = require("mongoose");

// const oldEventSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     poster: {
//         type: String,
//         default: "placeholder.img"
//     },
//     album: {
//         type: [String],
//         default: []
//     }
// })

// const oldEvents = new mongoose.model("oldEventCollection", oldEventSchema)
// module.exports = oldEvents


const mongoose = require('mongoose');

const oldEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    gallery: {
        type: [String],
        default: []
    }
});

const oldEvents = mongoose.model('oldEvents', oldEventSchema);

module.exports = oldEvents;
