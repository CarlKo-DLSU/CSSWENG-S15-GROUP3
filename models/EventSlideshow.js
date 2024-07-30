const mongoose = require("mongoose");

const slideshowSchema = new mongoose.Schema({
    slideshowImgs: {
        type: [String]
    }
})

const slideshow = new mongoose.model("slideshowCollection", slideshowSchema)
module.exports = slideshow