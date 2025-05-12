const express=require("express");
const app=express();
const {authAdmin,authUser}=require("./middlewares/Auth")

app.use("/admin",authAdmin)

app.get("/admin/getData",(req,res)=>{
    res.send("All data fetched successfully")
    
})

app.get("/admin/deleteData",(req,res)=>{
    res.send("Data deleted successfully")
    
})

app.post("/user/login",(req,res)=>{
    res.send("User logged in successfully")
})

app.get("/user/data",authUser,(req,res)=>{
    res.send("User data fetched")
})

app.listen(5000,()=>{
    console.log("Server is listening on port no 5000")
})