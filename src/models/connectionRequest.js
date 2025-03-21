const mongoose = require("mongoose");
//const mongooseSchema = new mongoose.Schmea({} , {timestamps : true})
const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required : true,
        },
        toUserId : {
            type: mongoose.Schema.Types.ObjectId,
            required : true,
        },
        status:{
            type: String,
            required:true,
            enum : {
                values:["ignored" , "intrested" , "accepted" , "rejected"],
                message:`{VALUE} is incorrect status type🥲`
            },
        },
    },
        { timestamps : true }
    
);
//This is compund index:->from and to both are there...this 1,-1 all are prototype.
connectionRequestSchema.index({ fromUserId : 1, toUserId : 1 }); //1 is assendind , -1 is desending

//New concept from mongoose called "pre".......normal function method,which includes("every time you save it will pre save it")

connectionRequestSchema.pre("save" , function (next) {
    const connectionRequest = this;
    //check if my from userId is same as send userId...
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Bro why are you sending connection request to youself, are you idiot???")
    }
    next(); //ye middleware jaisa kaam krega , isko call kiya jayega apne request route mai so next will be here.
})

const ConnectionRequestModel = new mongoose.model('ConnectionRequest' , connectionRequestSchema);

module.exports = ConnectionRequestModel;