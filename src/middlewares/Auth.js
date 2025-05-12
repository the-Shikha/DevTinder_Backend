const authAdmin=(req,res,next)=>{
    //logic for admin authentication
    console.log("Checking admin is authorized")
    const token="abc"
    const isValidated=token==="abc";
    if(!isValidated){
        res.status(401).send("Admin token is invalid")
    }
    else{
        next();
    }
}

const authUser=(req,res,next)=>{
    //logic for admin authentication
    console.log("Checking user is authorized")
    const token="abc"
    const isValidated=token==="abc";
    if(!isValidated){
        res.status(401).send("User token is invalid")
    }
    else{
        next();
    }
}
module.exports={authAdmin,authUser}