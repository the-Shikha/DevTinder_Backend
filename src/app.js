const express=require("express");
const app=express();

app.get("/user/data",(req,res)=>{
    try{
        throw new Error("Something error occured")
        res.send("User data fetched") 
    }
    catch(err){
        res.status(500).send("Oops! something went wrong 1!")
    }
})

app.get("/user/data",(req,res)=>{
    throw new Error("Something error occured")
    res.send("User data fetched")
})

app.use("/",(err,req,res,next)=>{
    res.status(500).send("Oops! something went wrong!")
})

app.listen(5000,()=>{
    console.log("Server is listening on port no 5000")
})