const express=require("express");
const app=express();

app.use("/hello",(req,res)=>{
    return res.send("Hello page of DevTinder")
})

app.use("/test",(req,res)=>{
    return res.send("Test page of DevTinder")
})

app.use("/",(req,res)=>{
   return res.send("Home page of DevTinder")
})

app.listen(5000,()=>{
    console.log("Server is listening on port no 5000")
})