const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);

dbConnect()
.then(()=>{
    console.log('Database Connection Established✅..');
    app.listen(7777, () => {
      console.log("This is my server having 7777 port....");
    });
})
.catch((err)=>{
    console.log('Database Connection Failed🙅‍♂️...');
})


