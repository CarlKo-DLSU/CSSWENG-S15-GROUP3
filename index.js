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
const NewEvent = require("./models/NewEvent")
const PastEvent = require("./models/PastEvent")
const slideshow = require("./models/EventSlideshow")

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


app.get("/",async (req,res)=>{
    const newEventsData = await NewEvent.find({});
    console.log(newEventsData);
    const slideshowData = await slideshow.find({});
    return res.render("1-index", {newEventsData, slideshowData}) // add in {slideshowData} when schema is populated, else error
})

app.get("/pastEvents",(req,res)=>{
    res.render("2-events")
})

app.get('/4-admin-homepage',async (req, res) => {
    const newEventsData = await NewEvent.find({});
    console.log(newEventsData);
    const slideshowData = await slideshow.find({});
    return res.render('4-admin-homepage', {newEventsData});
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
    const newEventsData = await NewEvent.find({});
    const slideshowData = await slideshow.find({});
    return res.render("1-index", {newEventsData, slideshowData})
})

app.post("/signin", async(req,res)=>{
    try {
        const check = await profiles.findOne({email:req.body.email})
        const newEventsData = await NewEvent.find({});

        if(check.password === req.body.password){
            if(req.body.email === "admin@gmail.com") {
                console.log("it went here");
                return res.render("4-admin-homepage", {newEventsData})
                console.log("Greetings Admin!")
            } else {
                const slideshowData = await slideshow.find({});
                return res.render("1-index", {newEventsData, slideshowData})
                console.log("Greetings!")
            }
        }
        else {
            const newEventsData = await NewEvent.find({});
            const slideshowData = await slideshow.find({});
            return res.render("1-index", {newEventsData, slideshowData})
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
    res.render('5-addPastEvents');
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
        res.render('2-events', { eventsData: eventsData });
    } catch (error) {
        console.error("Error fetching past events:", error);
        res.status(500).send("Error fetching past events.");
    }
});

app.get('/5-admin-events.hbs', async (req, res) => {
    try {
        const eventsData = await PastEvent.find({});
        console.log("Fetched past events successfully:", eventsData);
        res.render('5-admin-events', { eventsData: eventsData });
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
        res.render('3-about', { currAbout: currAbout });
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
        res.render('6-admin-about', { currAbout: currAbout });
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

app.get('/search', async (req, res) => {
    if (!req.query.unisearch) {
        const newEventsData = await NewEvent.find({});
        const slideshowData = await slideshow.find({});
        return res.render("1-index", {newEventsData, slideshowData})
    }
    else {
    const existPastEvent = await PastEvent.find({title: {$regex: req.query.unisearch, $options: "i"}}).collation({ locale: "en" }).sort({ title: 1 })
    const existNewEvent = await NewEvent.find({title: {$regex: req.query.unisearch, $options: "i"}}).collation({ locale: "en" }).sort({ title: 1 })
    const name = req.query.unisearch;
    return res.render("7-search.hbs", {name, existPastEvent, existNewEvent});
    }
})

app.delete('/deleteNewEvent', async (req, res) => {
    const { num_index } = req.body;

    console.log('Delete request received');
    console.log('num_index:', num_index);

    if (!num_index) {
        console.error('num_index is missing in the request body');
        return res.status(400).send('num_index is required');
    }

    try {
        console.log('Attempting to delete event with num_index:', num_index);
        const result = await NewEvent.findOneAndDelete({ num_index: num_index });

        if (result) {
            console.log('Event deleted successfully:', result);
            res.status(200).send('Event deleted successfully');
        } else {
            console.error('Event not found');
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error('Error deleting the event:', error.message);
        res.status(500).send('Error deleting the event');
    }
});

function formatDate(inputDate) {
    const date = new Date(inputDate);

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date).toUpperCase();
}


const storageNewEvent = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public', 'images', '1-index');
        console.log(uploadDir);
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

const uploadNewEvent = multer({ storage: storageNewEvent }); 

app.post('/editNewEvent', uploadNewEvent.single('edit-upcoming-cover-photo'), async (req, res) => {
    console.log("Multer middleware executed");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const num_index = req.body['num_index'];
    const title = req.body['edit-upcoming-title'];
    const subtitle = req.body['edit-upcoming-subtitle'];
    const date = formatDate(req.body['edit-upcoming-date']);
    const venue = req.body['edit-upcoming-venue'];
    const description = req.body['edit-upcoming-description'];
    const event_type = req.body['edit-upcoming-event-type'];
    const merch_link = req.body['edit-upcoming-merch-link'];

    try {
        const event = await NewEvent.findOne({ num_index: num_index });

        if (event) {
            event.title = title;
            event.subtitle = subtitle;
            event.date = date;
            event.description = description;
            event.venue = venue;

            if (req.file) {
                const posterPath = '/images/1-index/' + req.file.filename;
                console.log("Poster Path:", posterPath);
                event.poster = posterPath;
            } else {
                console.log("No file uploaded");
            }

            event.event_type = event_type;
            event.merch_link = merch_link;

            await event.save();
            res.status(200).send({ message: "Event updated successfully" });
        } else {
            res.status(404).send({ message: "Event not found" });
        }
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).send({ message: "Error updating event: " + error.message });
    }
});

app.post('/addNewEvent', uploadNewEvent.single('add-upcoming-cover-photo'), async(req, res) =>{
    console.log("I'm in addNewEvent")

    const title = req.body['add-upcoming-title']
    const subtitle = req.body['add-upcoming-subtitle']
    const date = req.body['add-upcoming-date']
    const description = req.body['add-upcoming-description']
    const eventType = req.body['add-upcoming-event-type']
    const venue = req.body['add-upcoming-venue']
    const newEventType = req.body['new-event-type']
    const merchLink = req.body['add-upcoming-merch-link']
    const coverPhoto = req.file ? '/images/1-index/' + req.file.filename : null;

    const maxNumIndexEvent = await NewEvent.findOne().sort('-num_index').exec();
    const maxNumIndex = maxNumIndexEvent ? parseInt(maxNumIndexEvent.num_index) : 0;
    const newNumIndex = maxNumIndex + 1;

    try{
        const maxNumIndexEvent = await NewEvent.findOne().sort('-num_index').exec();
        const maxNumIndex = maxNumIndexEvent ? parseInt(maxNumIndexEvent.num_index) : 0;
        const newNumIndex = maxNumIndex + 1;

        const newEvent = new NewEvent({
            title: title,
            subtitle: subtitle,
            date: date,
            description: description,
            venue: venue,
            poster: coverPhoto,
            num_index: newNumIndex,
            eventType: eventType,
            merch_link: merchLink
        })


        console.log(newEvent)
        await newEvent.save();

        const newEventsData = await NewEvent.find({});
        return res.render('4-admin-homepage', {newEventsData});
    } catch(error) {
        console.error("Error adding event:", error)
        res.status(500).send({ message: "Error updating event: " + error.message });
    }
})

app.listen(3000,()=>{
    console.log("Port connected");
})