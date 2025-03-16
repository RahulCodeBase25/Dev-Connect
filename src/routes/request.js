const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require ("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId" ,userAuth,async (req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored" , "intrested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message : "Invalid Status Type:" + status});
    }
    //Now if there is existing connection req, A to B or B to A:->

    const existingConncetionRequest = await ConnectionRequest.findOne({
      fromUserId,
      toUserId,
    })

    const connectionRequest = new ConnectionRequest({
      $or :[
        {fromUserId,toUserId},
        {fromUserId:toUserId,  toUserId:fromUserId}
      ]
    });

    const data =await connectionRequest.save();
    res.json({
      message : "Connection Request send successfully!",
      data,
    });
  } catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
  });

  module.exports = requestRouter;