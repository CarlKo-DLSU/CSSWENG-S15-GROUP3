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
const aboutUs = require("./models/AboutUs")
const UpcomingEvent = require("./models/UpcomingEvent")
const PastEvent = require("./models/PastEvent")

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
//app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }))
app.set("view engine","hbs")
app.set("views", __dirname + "/views")
app.use(bodyParser.json());

hbs.registerHelper('nl2br', function(text) {
    return text.replace(/\n/g, '<br>');
});


app.get("/",(req,res)=>{
    res.render("1-index")
})

app.get("/pastEvents",(req,res)=>{
    res.render("2-events")
})

app.get('/4-admin-homepage.hbs', (req, res) => {
    res.render('4-admin-homepage');
});

app.get('/5-admin-events.hbs', (req, res) => {
    res.render('5-admin-events');
});

app.get('/5-editPastEvents.hbs', (req, res) => {
    res.render('5-editPastEvents');
});


//Register and login db
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

//////////////////////ADD PAST EVENT DB
const storagePastEvent = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public', 'images', '2-events');
        // Check if the directory exists, otherwise create it
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating uploads directory:", err);
                cb(err, uploadDir); // Pass error to callback
            } else {
                cb(null, uploadDir);
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadPastEvent = multer({ storage: storagePastEvent }); 

app.post("/addPastEvent", uploadPastEvent.fields([{ name: 'cover', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
    const { title } = req.body;
    const cover = req.files['cover'] ? '/images/2-events/' + req.files['cover'][0].filename : null;
    const gallery = req.files['gallery'] ? req.files['gallery'].map(file => '/images/2-events/' + file.filename) : [];

    if (!title) {
        return res.status(400).send("Error: 'title' is required.");
    }

    console.log(title);
    console.log(cover);
    console.log(gallery);

    try {
        // Create new old Event
        await PastEvent.create({
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

app.get('/2-events.hbs', async (req, res) => {
    try {
        const eventsData = await PastEvent.find({});
        console.log("Fetched past events successfully:", eventsData); // Check if data is fetched correctly
        res.render('2-events', { eventsData: eventsData });
    } catch (error) {
        console.error("Error fetching past events:", error);
        res.status(500).send("Error fetching past events.");
    }
});


//////////////////////ABOUT US PAGE DATABASE
app.get('/3-about.hbs', async (req, res) => {
    console.log("It went to index.js");
    try {
        const currAbout = await aboutUs.findOne({});
        console.log("Fetched about us data:", currAbout); // Log to check the data
        res.render('3-about', { currAbout: currAbout });
    } catch (error) {
        console.error("Error fetching about us data:", error);
        res.status(500).send("Error fetching about us page.");
    }
});

app.get('/6-admin-about.hbs', async (req, res) => {
    console.log("It went to index.js");
    try {
        const currAbout = await aboutUs.findOne({});
        console.log("Fetched about us data:", currAbout); // Log to check the data
        res.render('6-admin-about', { currAbout: currAbout });
    } catch (error) {
        console.error("Error fetching about us data:", error);
        res.status(500).send("Error fetching about us page.");
    }
});

app.post('/updateAboutUs', async (req, res) => {
    const { mission, serviceDesc, visitTitle, visitDesc, visitImage } = req.body;

    try {
        await aboutUs.updateOne({}, {
            mission: mission,
            serviceDesc: serviceDesc,
            visitTitle: visitTitle,
            visitDesc: visitDesc,
            visitImage: visitImage
        });

    } catch (error) {
        console.error("Error updating About Us data:", error);
        res.status(500).send("Error updating About Us data.");
    }
});

app.get('/test', (req, res) => {
    console.log("Test route hit");
    res.send("Test route hit");
});

app.listen(3000,()=>{
    console.log("Port connected");
})