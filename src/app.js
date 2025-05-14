const express=require("express");
const app=express();
const connectDB=require("./config/database")
const User=require("./models/user")

app.use(express.json());

app.post("/signup",async (req,res)=>{
    console.log(req.body)
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
