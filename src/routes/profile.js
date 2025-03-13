const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require ("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view" ,userAuth, async (req , res)=>{
    try{
      const user = req.user;
     res.send(user);
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
    }
  })

  profileRouter.patch("/profile/edit" ,userAuth, async (req , res)=>{
    try{
      if (!validateEditProfileData(req)) {
        throw new Error("");
      }
      const loggedInuser = req.user; //this user field is attached by userAuth middleware
      Object.keys(req.body).forEach((key)=>(loggedInuser[key] = req.body[key]));   
      await loggedInuser.save() //now save data is DB
      res.json({message:`${loggedInuser.firstName},your profile has been updated Successfully!!`, data : loggedInuser})//Instead of res.send i can do like this also, It will give msg with the data of user.   
    }catch(err){
      res.status(400).send("ERROR : " + err.message);
    }
  })

  module.exports = profileRouter;