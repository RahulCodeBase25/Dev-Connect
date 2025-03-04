const express = require("express");

const app = express();

app.get("/userData" , (req,res)=>{
  throw new Error("Aabra ka dabra");
  res.send("user data ki need hai ab to...")
})

//Now the thing is , error handling hmesha "/" big boss ke pass hi hoti hai use ka use karke

app.use("/" , (err,req,res,next)=>{
  if(err){
    res.status(500).send("Some kind of error occured!!")
  }
})



app.listen(7777, () => {
  console.log("This is my server having 7777 port....");
});
