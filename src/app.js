const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user");

app.use(express.json());

app.get("/user" ,async (req,res)=>{
  const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId : userEmail});
    if(!user){
      res.status(404).send("User does not exist!!")
    }else{
      res.send(user)
    }
    
  }

  // try{
  //   const users = await User.find({emailId : userEmail});
  //   if(users.length ===0){
  //     res.status(404).send("User Email not found..")
  //   }else{
  //     res.send(users);
  //   }
  // }
  catch(err){
    res.status(400).send("Email id not found" + err.message);
  }
})

app.get("/feed" ,async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  }catch(err){
    res.status(400).send("Something Went Wrong!!!")
  }
})

app.post("/signup", async (req,res)=>{
  const user = new User (req.body);
  try{
    await user.save();
    res.send("User Added Sucessfully🌟")
  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
  }
  
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


