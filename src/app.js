const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res)=>{
  try{
    //First validating by adding validations
    validateSignUpdata(req);

    //Second adding encryption in or DB by bcrypt so our DB will not disclose the user password(and that is called adding salt or salting method in our DB).
    const {password , firstName , lastName , emailId} = req.body;
    const passwordHash = await bcrypt.hash(password,10); //here 10 is our salt.
    //Third - creating a new instace of user model.
    const user = new User ({
      firstName , lastName , emailId , password:passwordHash,
    });
    await user.save();
    res.send("User Added Sucessfully🌟")
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})

app.post("/login" , async (req,res)=>{
  try{
    const {emailId , password} = req.body;
    const user =await User.findOne({emailId : emailId});
    if(!user){
      throw new Error("Invalid Credentials❌...")
    }

    const isPasswordvalid = await bcrypt.compare(password , user.password);
    if(isPasswordvalid){

      //after eating cookie, lets add jwt:->
      const token =await jwt.sign({_id : user._id},"Singh5771@");
      console.log(token);
      

      //Now, i am adding the token to cookie and sending the response back to user
      res.cookie("token" , token)

      res.send("Login Successfull🥳...")
    }
    else{
      throw new Error("Invalid Credentials❌...")
    }


  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})

app.get("/profile" , async (req , res)=>{
  try{
  const cookies = req.cookies;
  const {token} = cookies;  //Ek route se dusre route mai agar kuch liya to {} lgane pdte hai...
  if(!token){
    throw new Error("Invalid token!!...")
  }
  const decodedMsg = await jwt.verify(token, "Singh5771@");
  const {_id} = decodedMsg; 
  const user = await User.findById(_id);
  if(!user){
    throw new Error("User not found...");
  }
   res.send(user);
}catch(err){
  res.status(400).send("ERROR : " + err.message);
  }
})


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
app.patch("/user/:userId", async(req, res)=>{
  const userId = req.params?.userId ; //Now userId is imp whenever i need to upate any users data.
  const data = req.body;  
  try{
    const ALLOWED_UPDATES=["photoUrl","about","skills","gender", "age"];

  const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k)); //I should remember this
  if(!isUpdateAllowed){
    throw new Error("Updates not allowed...");
  }
  if(data?.skills.length > 5){
    throw new Error("You can add only 5 skills here...")
  }
    const user = await User.findByIdAndUpdate({_id : userId} ,
    data , 
    {returnDocument : "before",runValidators:true} //Now bcz i added validations in my database so i have to add this "runValidators" field in my obj
    );
    //This returnDocument basically show karta hai apna latest data "before" and "after" ke baad..
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


