const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/Auth");
const User = require("../models/user");
const {validateEditProfileData}=require("../utils/validation")
const bcrypt=require("bcrypt")

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
            return res.status(401).send("Email and pwd can't be editable")
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

        Object.keys(req.body).forEach((key)=>user[key]=req.body[key])
        await user.save()
        res.json({
            message:"User data updated successfully",
            data:user
        })

    }
    catch(err){
        res.status(400).send("Issue while editing the profile : "+err.message)
    }
})

profileRouter.patch("/profile/changePassword",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        const {prevPassword,newPassword}=req.body;
        const {password}=user

        if (!prevPassword || !newPassword) {
            return res.status(400).send("Both previous and new password are required.");
        }

        // Check if new password is different from previous
        if (prevPassword === newPassword) {
            return res.status(400).send("New password must be different from the old password.");
        }
        const isPrevPasswordValid=await bcrypt.compare(prevPassword,password)
        if(!isPrevPasswordValid){
            res.status(400).send("Old password is not correct")
        }
        const hashNewPwd=await bcrypt.hash(newPassword,10);
        const updateUserPwdDb=await User.findByIdAndUpdate({_id:user._id},{password:hashNewPwd},{new:true})
        res.send(`Password changed successfully
                data : ${updateUserPwdDb}` )
    }
    catch(err){
        res.status(400).send("Issue while changing password: "+err.message)
    }
})


module.exports=profileRouter