const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/CSSWENGS15")
.then(()=>{
    console.log("MongoDB successfully connected!");
})
.catch(()=>{
    console.log("Failed to connect to MongoDB!");
})
