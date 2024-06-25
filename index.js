const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const mongo = require("./mongodb")
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require('body-parser');
const fs = require('fs');

const profiles = require("./models/Profile")
const newEvents = require("./models/NewEvent")
const oldEvents = require("./models/OldEvent")
const aboutUs = require("./models/AboutUs")
const UpcomingEvent = require("./models/UpcomingEvent");

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")
app.set("views", __dirname + "/views")
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
    }
});
const upload = multer({ storage: storage });

app.post("/addPastEvent", upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
    const { title } = req.body;
    const cover = req.files['cover'] ? '/uploads/' + req.files['cover'][0].filename : null;
    const gallery = req.files['gallery'] ? req.files['gallery'].map(file => '/uploads/' + file.filename) : [];

    if (!title) {
        return res.status(400).send("Error: 'title' is required.");
    }

    console.log(title);
    console.log(cover);
    console.log(gallery);

    try {
        // Create new old Event
        await oldEvents.create({
            title: title,
            cover: cover,
            gallery: gallery
        });

        res.render("5-admin-events");
    } catch (error) {
        console.error("Error creating old Event:", error);
        res.status(500).send("Error creating old Event.");
    }
});

app.get('/5-admin-events', async (req, res) => {
    try {
        const eventsData = await oldEvents.find({}); // Use a different variable name, like eventsData
        console.log("Fetched old events successfully:", eventsData);
        res.render('5-admin-events', { oldEventsData: eventsData }); // Pass eventsData to the template
    } catch (error) {
        console.error("Error fetching old events:", error);
        res.status(500).send("Error fetching old events.");
    }
});


app.get("/",(req,res)=>{
    res.render("1-index")
})

app.get("/pastEvents",(req,res)=>{
    res.render("2-events")
})

app.get("/about",(req,res)=>{
    res.render("3-about");
})

app.get('/2-events.hbs', (req, res) => {
    res.render('2-events');
});

app.get('/3-about.hbs', (req, res) => {
    res.render('3-about');
});

app.get('/4-admin-homepage.hbs', (req, res) => {
    res.render('4-admin-homepage');
});

app.get('/5-admin-events.hbs', (req, res) => {
    res.render('5-admin-events');
});

app.get('/5-editPastEvents.hbs', (req, res) => {
    res.render('5-editPastEvents');
});

app.get('/6-admin-about.hbs', (req, res) => {
    res.render('6-admin-about');
});

// app.post("/addPastEvent", upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
//     const { title } = req.body;
//     const cover = req.files['cover'] ? '/uploads/' + req.files['cover'][0].filename : null;
//     const gallery = req.files['gallery'] ? req.files['gallery'].map(file => '/uploads/' + file.filename) : [];

//     if (!title) {
//         return res.status(400).send("Error: 'title' is required.");
//     }

//     console.log(title);

//     try {
//         // Create new old Event
//         await oldEvents.create({
//             title: title,
//             cover: cover,
//             gallery: gallery
//         });

//         res.render("5-admin-events");
//     } catch (error) {
//         console.error("Error creating old Event:", error);
//         res.status(500).send("Error creating old Event.");
//     }
// });


app.post("/register", async(req,res)=>{

    const profile = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.contactNumber,
        password:req.body.password
    }

    await profiles.insertMany([profile])
    res.render("1-index")
})

app.post("/signin", async(req,res)=>{
    try {
        const check = await profiles.findOne({email:req.body.email})

        if(check.password === req.body.password){
            if(req.body.email === "admin@gmail.com") {
                res.render("4-admin-homepage")
                console.log("Greetings Admin!")
            } else {
                res.render("1-index")
                console.log("Greetings!")
            }
        }
        else {
            res.render("1-index")
        }
    } catch {
        res.send("Wrong Details")
    }
})

app.listen(3000,()=>{
    console.log("Port connected");
})