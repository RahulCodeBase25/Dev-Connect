const express = require("express");

const app = express();

const {adminAuth , userAuth} = require("./middlewares/auth")  //require kiya admin ke auth ke liye

//now let me create a middleware for Auth and put all conditions and logic in only one function:->
app.use("/admin" ,adminAuth )

app.get("/admin/getAllData", (req,res)=>{
  res.send("All data sent");
})

app.get("/admin/deleteUser", (req,res)=>{
  res.send("Deleted all user");
})

app.get("/user" , userAuth, (req,res)=>{  //i can also do like this , userAuth ka middleware sidha idhari hi define kar diya.
  res.send("User data sent ")
})









//Here "?" represents that ,whatever is before ? mark is optional ,ex:->rahul and rahl both will work
//and "+" means before rahuuuuuuul can write like this but rahullll is now allowed
//and "*" means(rah*ul), if i write rahhckhdhcdhcdhul it will work, but i have to make sure that my word should only start with "rah" and ends with "ul"
app.use("/ra(hu)?l", (req, res) => {
  //if i do like this,that means "hu" is optional
  //and this() things works with * , + , ? and all.
  res.send("learning about ? and +..advance routing technique");
});

app.listen(7777, () => {
  console.log("This is my server having 7777 port....");
});
