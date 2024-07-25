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

hbs.registerPartials(__dirname + '/views/partials');



hbs.registerHelper('nl2br', function(text) {
    return text.replace(/\n/g, '<br>');
});

/*
app.get("/",(req,res)=>{
    res.render("1-index")
})
*/

app.get("/",(req,res)=>{
    res.render('1-index', {
        layout: '/layouts/index',
        title: 'SX Manila | Homepage',
        filename: '1-index'
    })
})


/* 
app.get("/pastEvents",(req,res)=>{
    res.render("2-events")
})*/

 
app.get("/pastEvents",(req,res)=>{
    res.render('2-events', {
        layout: '/layouts/index',
        title: 'SX Manila | Events',
        filename: '1-index'
    })
})


app.get("/4-admin-homepage.hbs",(req,res)=>{
    res.render('4-admin-homepage', {
        layout: '/layouts/index',
        title: 'SX Manila | Admin Homepage',
        filename: '1-index'
    })
})

//Register and login db
app.post("/register", async(req,res)=>{

    const profile = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.contactNumber,
        password:req.body.password
    }

    await profiles.insertMany([profile])
    //res.render("1-index")
    res.render('1-index', {
        layout: '/layouts/index',
        title: 'SX Manila | Homepage',
        filename: '1-index'
    })
})

app.post("/signin", async(req,res)=>{
    try {
        const check = await profiles.findOne({email:req.body.email})

        if(check.password === req.body.password){
            if(req.body.email === "admin@gmail.com") {

                console.log("it went here");
                //res.render("4-admin-homepage")
                res.render('4-admin-homepage', {
                    layout: '/layouts/index',
                    title: 'SX Manila | Admin Homepage',
                    filename: '1-index'
                })
                console.log("Greetings Admin!")
            } else {
                //res.render("1-index")
                res.render('1-index', {
                    layout: '/layouts/index',
                    title: 'SX Manila | Homepage',
                    filename: '1-index'
                })
                console.log("Greetings!")
            }
        }
        else {
            //res.render("1-index")
            res.render('1-index', {
                layout: '/layouts/index',
                title: 'SX Manila | Homepage',
                filename: '1-index'
            })
        }
    } catch {
        res.send("Wrong Details")
    }
})

//UPLOAD FOR PAST EVENT
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

//////////////////////EDIT PAST EVENT DB
app.get('/5-editPastEvents.hbs', async (req, res) => {
    const eventId = req.query.id;
    try {
        const event = await PastEvent.findById(eventId);
        if (event) {
            
            res.render('5-editPastEvents', {
                id: event.id,
                //IDK HOW TO RESOLVE THIS BC TITLE HERE IS THE SAME AS THE TITLE IN THE PARTIALS WKADJSAKDJKS: TO FIX NALANG LMAO
                title: event.title,
                cover: event.cover,
                gallery: event.gallery
            });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post("/editPastEvent", uploadPastEvent.fields([{ name: 'cover', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
    const { id, title } = req.body;
    const existingCover = req.body.existingCover;
    const existingGallery = req.body.existingGallery ? (Array.isArray(req.body.existingGallery) ? req.body.existingGallery : [req.body.existingGallery]) : [];
    const deletedGallery = req.body.deletedGallery ? (Array.isArray(req.body.deletedGallery) ? req.body.deletedGallery : [req.body.deletedGallery]) : [];

    console.log("Here is gallery");
    console.log(existingGallery);
    console.log("Here is deleted");
    console.log(deletedGallery);
    console.log("Here is added");
    console.log(req.files['gallery']);
    
    try {
        const eventToUpdate = await PastEvent.findById(id);

        if (!eventToUpdate) {
            return res.status(404).send('Event not found');
        }

        // Update the event title
        eventToUpdate.title = title;

        // Handle cover image
        if (req.files['cover'] && req.files['cover'][0]) {
            const coverPath = '/images/2-events/' + req.files['cover'][0].filename;
            eventToUpdate.cover = coverPath;
        } else {
            eventToUpdate.cover = existingCover;
        }

        // Handle gallery images
        let gallery = existingGallery;

        // Remove deleted images from gallery
        gallery = gallery.filter(img => !deletedGallery.includes(img));

        console.log("Here are the images left in the gallery");
        console.log(gallery);

        // Add new images to gallery
        if (req.files['gallery']) {
            const newGalleryImages = req.files['gallery'].map(file => 'images/2-events/' + file.filename);
            gallery = gallery.concat(newGalleryImages);
        }

        eventToUpdate.gallery = gallery;

        await eventToUpdate.save();
        res.send("<script>alert('Edit was successful.'); window.location.href = '5-admin-events.hbs'; </script>");
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).send("Error updating event.");
    }
});

//////////////////////ADD PAST EVENT DB
app.get('/5-addPastEvents.hbs',(req, res) => {
    //res.render('5-addPastEvents');
    res.render('5-addPastEvents', {
        layout: '/layouts/index',
        title: 'SX Manila | Events',
        filename: '1-index'
    })
});

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

        res.redirect("5-admin-events.hbs");
    } catch (error) {
        console.error("Error creating old Event:", error);
        res.status(500).send("Error creating old Event.");
    }
});

app.get('/2-events.hbs', async (req, res) => {
    try {
        const eventsData = await PastEvent.find({});
        console.log("Fetched past events successfully:", eventsData); // Check if data is fetched correctly
        res.render('2-events', { 
            eventsData: eventsData ,
            layout: '/layouts/index',
            title: 'SX Manila | Events',
            filename: '1-index'
        });
    } catch (error) {
        console.error("Error fetching past events:", error);
        res.status(500).send("Error fetching past events.");
    }
});

app.get('/5-admin-events.hbs', async (req, res) => {
    try {
        const eventsData = await PastEvent.find({});
        console.log("Fetched past events successfully:", eventsData);
        res.render('5-admin-events', {
            eventsData: eventsData ,
            layout: '/layouts/index',
            title: 'SX Manila | Events',
            filename: '1-index' });
    } catch (error) {
        console.error("Error fetching past events:", error);
        res.status(500).send("Error fetching past events.");
    }
});

const getAboutUsData = () => {
    const filePath = path.join(__dirname, 'populate', 'aboutUs.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
};

//////////////////////ABOUT US PAGE DATABASE
app.get('/3-about.hbs', async (req, res) => {
    console.log("It went to index.js");
    try {
        const currAbout = getAboutUsData();
        console.log("Fetched about us data:", currAbout); // Log to check the data
        res.render('3-about', { 
            currAbout: currAbout,
            layout: '/layouts/index',
            title: 'SX Manila | About Us',
            filename: '1-index' });
    } catch (error) {
        console.error("Error fetching about us data:", error);
        res.status(500).send("Error fetching about us page.");
    }
});

app.get('/6-admin-about.hbs', async (req, res) => {
    console.log("It went to index.js");
    try {
        const currAbout = getAboutUsData();
        console.log("Fetched about us data:", currAbout); // Log to check the data
        res.render('6-admin-about', {
            currAbout: currAbout ,
            layout: '/layouts/index',
            title: 'SX Manila | About Us',
            filename: '1-index'
        });
    } catch (error) {
        console.error("Error fetching about us data:", error);
        res.status(500).send("Error fetching about us page.");
    }
});

app.post('/updateAboutUs', async (req, res) => {
    const { mission, visitTitle, visitDesc, visitImage } = req.body;
    try {
        const filePath = path.join(__dirname, 'populate', 'aboutUs.json');
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        const updatedAboutUs = {
            ...existingData,
            mission: mission,
            visitTitle: visitTitle,
            visitDesc: visitDesc,
            visitImage: visitImage
        };
        
        fs.writeFileSync(filePath, JSON.stringify(updatedAboutUs, null, 2));
        res.redirect('/6-admin-about.hbs');
    } catch (error) {
        console.error("Error updating About Us data:", error);
        res.status(500).send("Error updating About Us data.");
    }
});

app.listen(3000,()=>{
    console.log("Port connected");
})