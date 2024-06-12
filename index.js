const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")

app.use(express.json())
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

app.listen(3000,()=>{
    console.log("port connected");
})