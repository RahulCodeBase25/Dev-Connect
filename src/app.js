const express = require("express");

const app = express();
app.use("/", (req, res, next) => {
    if (req.path === "/") {
        res.send("This is my dashboard..");
    } else {
        next(); // Pass the request to the next matching route
    }
});

app.use("/about" , (req,res)=>{
    res.send("This is my about page..");
})

app.use("/contact", (req,res)=>{
    res.send("This is my contact page..");
})
 
app.use("/page", (req,res)=>{
    res.send("This is just a randome page...")
})

app.listen(7777, ()=>{
    console.log('This is my server having 7777 port....');
})