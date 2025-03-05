const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type:String
    } , 
    lastName : {
        type: String
    },
    age : {
        type : Number
    },
    emailId : {
        type : String
    },
    password : {
        type: String
    }
})

module.exports = mongoose.model("User" , userSchema);
