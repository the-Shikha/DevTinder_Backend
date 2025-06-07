const express=require("express")
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation")
const User=require("../models/user")
const bcrypt=require("bcrypt")
const validator=require("validator")

authRouter.post("/signup",async (req,res)=>{
    try{
        //validate data
        validateSignUpData(req);
        

        //encrypt pwd
        const {firstName,lastName,emailId,password}=req.body
        const hashPassword=await bcrypt.hash(password,10);

        //save it to the db
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashPassword
        });
        const savedUser=await user.save();
        //create json web token
        const token=await savedUser.getJWT()

        //send it inside cookie
        res.cookie("token",token,{expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)})
        
        res.json({
            message:"User data is sending successfully!",
            data:savedUser
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
    
})

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Enter a valid email id")
        }
        const user=await User.findOne({emailId:emailId})
        const isValid=await user.validatePwd(password)
        if(!isValid){
            res.status(401).send("Invalid credentials")
        }

        //create json web token
        const token=await user.getJWT()

        //send it inside cookie
        res.cookie("token",token,{expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)})
        
        res.send(user)

    }
    catch(err){
        res.status(401).send("Invalid credentials")
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.send("User logged out successfully")
})

module.exports=authRouter