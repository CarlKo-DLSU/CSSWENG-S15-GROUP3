const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://charlizevillafloresa_db_user:5U2zquGmwB6705S3@sxmanila.rdwygx4.mongodb.net/SXmanila?retryWrites=true&w=majority&appName=SXManila")
.then(()=>{
    console.log("MongoDB successfully connected!");
    console.log("Database:", mongoose.connection.db.databaseName);
})
.catch((error)=>{
    console.log("Failed to connect to MongoDB!");
    console.error("Connection error:", error.message);
})

var db = mongoose.connection;

// Add connection event listeners
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});