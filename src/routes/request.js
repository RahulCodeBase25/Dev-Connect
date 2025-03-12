const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require ("../middlewares/auth")

requestRouter.post("/sendConnectionReq" ,userAuth,async (req,res)=>{
    const user = req.user; //This is how i can read who is the user here..
    console.log('Sending a connection request but auth became easy now..');
    res.send(user.firstName + "Sended you a request🤭")  
  });

  module.exports = requestRouter;