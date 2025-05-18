const express=require("express");
const app=express();
const connectDB=require("./config/database")
const User=require("./models/user")
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const validator=require("validator")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {userAuth}=require("./middlewares/Auth")

app.use(express.json());
app.use(cookieParser())

app.post("/signup",async (req,res)=>{
    //console.log(req.body)
    // const userObj={
    //     firstNames:"Kanika",
    //     lastName:"Sharma",
    //     emailId:"kanika@gmail.com",
    //     password:"12345"
    // }
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
        await user.save();
        res.send("User data is sending successfully!")
    }
    catch(err){
        res.status(400).send(err.message)
    }
    
})

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Enter a valid email")
        }
        const user=await User.findOne({emailId:emailId})
        const isValid=await user.validatePwd(password)
        if(!isValid){
            res.status(401).send("Password is incorrect, try again")
        }

        //create json web token
        const token=await user.getJWT()

        //send it inside cookie
        res.cookie("token",token,{expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)})
        
        res.send("User logged in successfully")

    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.post("/sendConnectionRequest",userAuth,(req,res)=>{
    try{
        const user=req.user;
        res.send(user.firstName+ " is sending a friend request");
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.get("/user",async (req,res)=>{
    //const userEmail=req.body.emailId;
    const id =req.body._id;
    try{
        //const user=await User.find({emailId:userEmail})
        //const user=await User.findOne({emailId:userEmail})
        const user=await User.findById({_id:id})
        if(user.length===0){
            res.send("User not found")
        }
        else{
            res.send(user)
        }
    }
    catch(err){
        console.log("Something went wrong")
    }
    
})


app.get("/feed",async (req,res)=>{
    try{
        const user=await User.find({})
        if(user.length===0){
            res.send("User not found")
        }
        else{
            res.send(user)
        }
    }
    catch(err){
        console.log("Something went wrong")
    }
    
})

app.delete("/user",async (req,res)=>{
    const userId=req.body._id
    try{
        const user=await User.findByIdAndDelete({_id:userId})
        res.send("User deleted successfully")
    
    }
    catch(err){
        console.log("Something went wrong while deleting user")
    }
    
})

app.patch("/user/:userId",async (req,res)=>{
    const userId=req.params?.userId
    const newData=req.body
    
    try{
        const ALLOWED_FIELD=[
            "age","gender","photoUrl","about","skills"
        ]
        const isAllowed=Object.keys(newData).every((k)=>
            ALLOWED_FIELD.includes(k)
        )
        if(!isAllowed){
            throw new Error("Please update invalid field")
        }
        if(newData.skills.length>10){
            throw new Error("Skills can't exceeds lenth upto 10")
        }
        const user=await User.findByIdAndUpdate({_id:userId},newData,{runValidators:true})
        
        res.send("User updated successfully")
    
    }
    catch(err){
        res.status(400).send(err.message)
    }
    
})


connectDB()
.then(()=>{
    console.log("DB connected successfully :)")
    app.listen(5000,()=>{
        console.log("Server is listening on port no 5000")
    })
})
.catch(()=>{
    console.log("Issue while connecting DB")
})
