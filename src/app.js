const express=require("express");
const app=express();
const connectDB=require("./config/database")
const User=require("./models/user")

app.use(express.json());

app.post("/signup",async (req,res)=>{
    //console.log(req.body)
    // const userObj={
    //     firstNames:"Kanika",
    //     lastName:"Sharma",
    //     emailId:"kanika@gmail.com",
    //     password:"12345"
    // }
    const user=new User(req.body);
    try{
        await user.save();
        res.send("User data is sending successfully!")
    }
    catch(err){
        res.status(400).send("Issue while sending data")
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

app.patch("/user",async (req,res)=>{
    const userId=req.body._id
    // const newData={
    //     firstName:"Shivani"
    // }
    const newData=req.body
    try{
        const user=await User.findByIdAndUpdate({_id:userId},newData)
        res.send("User updated successfully")
    
    }
    catch(err){
        console.log("Something went wrong while updating user")
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
