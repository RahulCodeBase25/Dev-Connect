const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require ("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const user = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId" ,userAuth,async (req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatus = ["ignored" , "intrested"];
    //Phle check karte hai status brobar hai ya nhi
    if(!allowedStatus.includes(status)){ //ye status params ka , never trust req,corner case-saftey
      return res.status(400).json({message : "Invalid Status Type:" + status});
    }

    //fhir check karte hai User Id apne hi Db ki hai ya koi bhi user aa rha khi se :->
    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message : "User not found"});
    }

    //fhir ab handle karte hai ki khi thor , thor ko hi connectionreq na bhej de
    //or ye kaam connectionrequest ke schema ke baad hi kar liya to vha check kar...


    //Now if there is existing connection req, me to thor , thor to me, dont allow to send again:->
    const existingConncetionRequest =  await ConnectionRequest.findOne({
      $or :[  //This is mongo db thing, its call "or" ,  with $
        {fromUserId,toUserId},
        {fromUserId:toUserId,  toUserId:fromUserId} //Its like to check vice versa condition here.
      ]
    });
    if(existingConncetionRequest){
      return res.status(400).send({ message : "Connection Request Already Exists" });
    }


    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    

    const data =await connectionRequest.save();
    res.json({
      message :req.user.firstName+ " got "+status+" by "+toUser.firstName,
      data,
    });
  } catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
  });

  module.exports = requestRouter;