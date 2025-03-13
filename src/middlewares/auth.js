const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth =async (req,res,next)=>{
  //1)->Read the token from the req cookies
  try{
  const {token} = req.cookies;
  console.log("Cookies received:", req.cookies); // Log all cookies  
  console.log("Extracted token:", token); // Check if token exists
  
  if(!token){
    throw new Error("Invalid token!!🎟️🎟️...")
  }
  const decodedObj =await jwt.verify(token, "Aara25398@");

  //2)->Validate the token
  const{ _id } = decodedObj;
  const user = await User.findById(_id)
  if(!user){
    throw new Error("User not found👤...")
  }
  
  req.user= user; //Now from Auth we will get this user ans send it back to the further process is /profile

  next(); //bcz its the middleware so we can easily use the next function...

}catch(err){
  res.status(400).send("ERROR : "+err.message)
}
  }

  module.exports = {  
    userAuth ,
  }