const User = require("../models/user");
const jwt=require("jsonwebtoken")

const userAuth=async(req,res,next)=>{
    try{
        const cookies=req.cookies;
        const {token}=cookies;
        if(!token){
            return res.status(401).send("Please login!")
        }
        const isTokenValidObj=jwt.verify(token,"DevTinder@01")
        const id=isTokenValidObj._id
        const user=await User.findById(id);
        if(!user){
            throw new Error("User is not present in DB");
        }
        req.user=user
        next();
    }
    catch(err){
        res.status(400).send(err.message)
    }

}
module.exports={userAuth}