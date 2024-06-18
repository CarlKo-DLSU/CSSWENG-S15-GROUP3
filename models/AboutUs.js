const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
    mission: {
        type: String
    },
    serviceImg: {
        type: [String]
    },
    serviceDesc: {
        type: [String]
    },
    visitImage: {
        type: String
    },
    visitTitle: {
        type: String
    },
    visitDesc: {
        type: String
    }
})

const aboutUs = new mongoose.model("aboutUsCollection", aboutUsSchema)
module.exports = aboutUs