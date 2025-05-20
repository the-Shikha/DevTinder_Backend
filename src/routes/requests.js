const express=require("express")
const connectionRequestRouter=express.Router();
const {userAuth}=require("../middlewares/Auth")

connectionRequestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    try{
        const user=req.user;
        res.send(user.firstName+ " is sending a friend request");
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports=connectionRequestRouter