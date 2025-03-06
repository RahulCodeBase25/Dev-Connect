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

app.delete("/user" , async (req,res)=>{
  const userId = req.body.userId;
  try{
    // const user = await User.findByIdAndDelete({_id : userId}); //i can also pass like this✅
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully!!")
  }catch(err){
    res.status(404).send("The user you're trying to delete is not found..")
  }
})

//Lets create a update Api now:->
app.patch("/user", async(req, res)=>{
  const userId = req.body.userId ; 
  const data = req.body;
  
  try{
    const user = await User.findByIdAndUpdate({_id : userId} ,
    data , 
    {returnDocuement : "before",runValidators:true} //Now bcz i added validations in my database so i have to add this "runValidators" field in my obj
    );
    //This returnDocuement basically show karta hai apna latest data "before" and "after" ke baad..
    res.send("User has been updated");
  }catch(err){
    res.status(404).send("User updation failed!!" + err.message)
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


