const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required : true,
        minLength : 2,
        maxLength : 50
    } , 
    lastName : {
        type: String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type: String , 
        required :true
    },
    age : {
        type : Number,
        minValue : 18 , //If it's a num it should be value and if its string it should be length.
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female" , "other"].includes(value)){
                throw new Error("Entered the wrong value.");
            }
        },
    },
    photoUrl : {
        type : String , 
        default : "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small_2x/a-person-icon-on-a-transparent-background-png.png"
        },

    about : {
        type : String,
        default : "This is your about section"
    },
    skills : {
        type : [String]
    }
},
{timestamps : true},//ye filed mere pure mongoose schema ke sath add hoga.it will give createdAt and Updated At 
)

module.exports = mongoose.model("User" , userSchema);
