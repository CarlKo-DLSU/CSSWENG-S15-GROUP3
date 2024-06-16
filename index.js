const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const mongo = require("./mongodb")

const profiles = require("./models/Profile")
const newEvents = require("./models/NewEvent")
const oldEvents = require("./models/OldEvent")

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")
app.set("views", __dirname + "/views")

app.get("/",(req,res)=>{
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

app.listen(3000,()=>{
    console.log("Port connected");
})