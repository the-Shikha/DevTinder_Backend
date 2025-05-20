const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/Auth");
const User = require("../models/user");
const {validateEditProfileData}=require("../utils/validation")

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            res.status(401).send("Email and pwd can't be editable")
        }
        const user=req.user;
        // const {firstName,lastName,age,gender,photoUrl,about,skills}=req.body;
        // const updatedProfile=await User.findByIdAndUpdate({_id:user._id},{
        //     firstName:firstName,
        //     lastName:lastName,
        //     age:age,
        //     gender:gender,
        //     photoUrl:photoUrl,
        //     about:about,
        //     skills:skills
        // },{new:true})
        // res.send(updatedProfile)

        Object.keys(req.body).forEach(key=>user[key]=req.body[key])
        await user.save()
        res.send(user)

    }
    catch(err){
        res.status(400).send("Issue while editing the profile : "+err.message)
    }
})


module.exports=profileRouter