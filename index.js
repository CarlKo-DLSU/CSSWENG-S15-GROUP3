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

app.get("/",(req,res)=>{
    res.render("1-index")
})

app.get("/1-index.hbs",(req,res)=>{
    res.render("1-index")
})

app.get("/pastEvents",(req,res)=>{
    res.render("2-events")
})

app.get("/about",(req,res)=>{
    res.render("3-about")
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

app.post('/api/events', async (req, res) => {
    try {
        const event = req.body;

        await event.save();
        res.status(200).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/events", async (req, res) => {
    const events = await UpcomingEvent.find({});
    res.json(events);
});

app.put("/api/events/:id", upload.single('coverPhoto'), async (req, res) => {
    const { title, date, description, venue, merchLink } = req.body;
    const coverPhoto = req.file ? req.file.path : null;

    const event = await UpcomingEvent.findById(req.params.id);

    if (event) {
        event.title = title;
        event.date = date;
        event.description = description;
        event.venue = venue;
        event.merchLink = merchLink;
        if (coverPhoto) {
            event.coverPhoto = coverPhoto;
        }

        await event.save();
        res.json(event);
    } else {
        res.status(404).send("Event not found");
    }
});

app.delete("/api/events/:id", async (req, res) => {
    const event = await UpcomingEvent.findById(req.params.id);
    if (event) {
        await event.remove();
        res.status(204).send();
    } else {
        res.status(404).send("Event not found");
    }
});

// app.post('/api/saveEvent', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 5 }]), (req, res) => {
//     const { title } = req.body;
//     const coverImage = req.files['coverImage'][0].path;
//     const galleryImages = req.files['galleryImages'].map(file => file.path);

//     // Create a new event instance
//     const newEvent = new Event({
//         title: title,
//         coverImage: coverImage,
//         galleryImages: galleryImages
//     });

//     // Save the event to MongoDB
//     newEvent.save()
//         .then(() => {
//             // Clean up uploaded files after saving to database (optional)
//             galleryImages.forEach(imagePath => {
//                 fs.unlinkSync(imagePath);
//             });
//             fs.unlinkSync(coverImage);

//             res.status(200).json({ message: 'Event saved successfully' });
//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message });
//         });
// });

app.listen(3000,()=>{
    console.log("Port connected");
})