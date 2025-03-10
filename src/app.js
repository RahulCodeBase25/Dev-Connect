const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require ("./middlewares/auth")

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
    const isPasswordvalid = await user.validatePassword(password);
    if(isPasswordvalid){
      const token = await user.getJWT();
      //Now, i am adding the token to cookie and sending the response back to user
      res.cookie("token" , token , {expires: new Date(Date.now()+ 8 * 3600000)}) //upar bnaya token expire hone ka ye hai 8 hours mai cookies expire hone ka , we can see the date in cookies postman
      res.send("Login Successfull🥳...")
    }
    else{
      throw new Error("Invalid Credentials🙅‍♂️...")
    }
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})

app.get("/profile" ,userAuth, async (req , res)=>{
  try{
    const user = req.user;
   res.send(user);
}catch(err){
  res.status(400).send("ERROR : " + err.message);
  }
})
app.post("/sendConnectionReq" ,userAuth, (req,res)=>{
  const user = req.user; //This is how i can read who is the user here..
  console.log('Sending a connection request but auth became easy now..');
  res.send(user.firstName + "Sended you a request🤭")  
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


