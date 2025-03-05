const mongoose = require("mongoose");

const dbConnect = async ()=>{
    await mongoose.connect(
        "mongodb+srv://rahulcodecraft25:CLsmb8FvtTCFw7lo@namastenodebyrahul.poqi7.mongodb.net/"
    );
};


module.exports = dbConnect;
