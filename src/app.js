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

app.get("/user" , (req,res)=>{
    res.send({firstName: "Rahul", lastName:"Singh"})
})

app.post("/user" , (req,res)=>{
    res.send("The data which we get is saved succesfully in this post method...")
})

app.delete("/user" , (req,res)=>{
    res.send("Deleted Successfully!!!")
})

app.listen(7777, ()=>{
    console.log('This is my server having 7777 port....');
})