const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required : true,
        index: true, //agar laakh user hai usme se bhot ka firstname same hoga hi,to ye indexing karna is imp
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
        trim : true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email addres: " + value);
        }
        },
    },
    password : {
        type: String , 
        required :true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is weak: " + value);
            }
            },
    },
    age : {
        type : Number,
        minValue : 18 , //If it's a num it should be value and if its string it should be length.
    },
    gender : {
        type : String,
        enum:{
        values:["male" , "female" , "other"],
        message:`{VALUE} is not a type of gender🥲`,
        // validate(value){
        //     if(!["male", "female" , "other"].includes(value)){
        //         throw new Error("Entered the wrong value.");
        //     }
        },
    },
    photoUrl : {
        type : String , 
        default : "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small_2x/a-person-icon-on-a-transparent-background-png.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: " + value);
            }
            },
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
);

userSchema.methods.getJWT = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "Aara25398@", { expiresIn: "8d" }); 
    return token;  // Return the token
};

//Now lets do same bcrypt means for validating password:->
userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;
    const passwordHash = user.password;
    const isPasswordvalid = await bcrypt.compare(passwordInputByUser , passwordHash);
    return isPasswordvalid;

}
module.exports = mongoose.model("User" , userSchema);
