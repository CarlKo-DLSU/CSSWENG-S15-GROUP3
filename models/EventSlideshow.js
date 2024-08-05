const mongoose = require("mongoose");

const slideshowSchema = new mongoose.Schema({
    slideshowImg: {
        type: String
    }
})

const slideshow = new mongoose.model("slideshowCollection", slideshowSchema)
module.exports = slideshow