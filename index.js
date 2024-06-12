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

app.listen(3000,()=>{
    console.log("Port connected");
})