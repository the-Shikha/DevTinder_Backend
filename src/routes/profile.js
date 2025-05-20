const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/Auth")

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports=profileRouter