const adminAuth = (req,res,next)=>{
    console.log('Admin auth is getting checked');
    
  const token = "xyz";
  const isAdminAuthorized = token==="xyz";
  if(!isAdminAuthorized){
    res.status(401).send("Not authorized")
  }else{
    next();
  }
  }

  const userAuth = (req,res,next)=>{
    console.log('Admin auth is getting checked');
    
  const token = "xyz";
  const isAdminAuthorized = token==="xyz";
  if(!isAdminAuthorized){
    res.status(401).send("Not authorized")
  }else{
    next();
  }
  }

  module.exports = {  //normal object ke form mai exports kiya...
    adminAuth,
    userAuth ,
  }