const express=require("express");
const app=express();

app.get("/user",
    [(req,res,next)=>{
        console.log("1st route handler")
        //res.send("1st response")
        next();
    },
    (req,res,next)=>{
        console.log("2nd route handler")
        //res.send("2nd response")
        next();
    },
    (req,res,next)=>{
        console.log("3rd route handler")
        //res.send("3rd response")
        next();
    },
    (req,res,next)=>{
        console.log("4th route handler")
        //res.send("4th response")
        next();
    },
    (req,res,next)=>{
        console.log("5th route handler")
        res.send("5th response")
        next();
    }]

)

app.listen(5000,()=>{
    console.log("Server is listening on port no 5000")
})