const express = require("express");

const app = express();
app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.send("This is my dashboard..");
  } else {
    next(); // Pass the request to the next matching route
  }
});

app.use("/about", (req, res) => {
  res.send("This is my about page..");
});

app.use(
  "/test",
  (req, res, next) => {
    res.send("Handling the routes");
    console.log('In array format that will also give the same op');
    next();
  },
  (req, res,next) => {
    console.log('Handling the 2nd route inside of route...');
    // res.send("Route ke andar ka route");
    // next();
  },
  (req,res)=>{
    console.log('there have to be a route handler , then only next will work');
    
  }
);

app.get("/user/:userId/:ghar/:gym", (req, res) => {
  //this is how you read your data
  console.log(req.query); //just to do this "/user?userid=101"
  console.log(req.params); //this is how you read the parameters of routes given after ":"
  //":" -colon means dynamic routes
  res.send({ firstName: "Rahul", lastName: "Singh" });
});

app.post("/user", (req, res) => {
  res.send("The data which we get is saved succesfully in this post method...");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully!!!");
});

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
