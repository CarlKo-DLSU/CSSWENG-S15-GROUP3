const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://fionaamaiatano:d1JEp35Kb3NIgiEM@sxmanila.e4vygj7.mongodb.net/?retryWrites=true&w=majority&appName=SXManila")
.then(()=>{
    console.log("MongoDB successfully connected!");
})
.catch(()=>{
    console.log("Failed to connect to MongoDB!");
})

var db = mongoose.connection;