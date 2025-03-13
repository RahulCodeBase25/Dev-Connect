const validator = require("validator");

const validateSignUpdata=(req)=>{
    const{ firstName,lastName,emailId,password } = req.body ;

    if(!firstName || !lastName){
        throw new Error("Please Enter the name...");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please enter valid email id...")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter valid and strong password...")
    }
}

const validateEditProfileData=(req)=>{
    const allowedEditFields = ["fisrtName","Lastname","photoUrl","gender","age","about","skills"];

    const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports = {validateSignUpdata, validateEditProfileData}