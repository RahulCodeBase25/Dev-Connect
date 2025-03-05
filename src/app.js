const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res)=>{
  const user = new User ({
    firstName : "Viral",
    lastName:"kohli",
    age: 38,
    emailId : "virat.kohli@gmail.com",
    password : "virat@",
  });
  await user.save();
  res.send("User Added Sucessfully🌟")
})

dbConnect()
.then(()=>{
    console.log('Database Connection Established✅..');
    app.listen(7777, () => {
      console.log("This is my server having 7777 port....");
    });
})
.catch((err)=>{
    console.log('Database Connection Failed🙅‍♂️...');
})


