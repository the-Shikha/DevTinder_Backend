const express=require("express");
const app=express();

//This is giving error
// app.get("/ab+c",(req,res)=>{
//     res.send("user +")
// })

// app.get(/a/,(req,res)=>{
//     res.send("Regex")
// })

// app.get(/.*fly$/,(req,res)=>{
//     res.send("Regex end with fly")
// })

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     return res.send({firstName:"Shikha",lastName:"Das"})
// })

app.get("/user/:userId/:name/:work",(req,res)=>{
    console.log(req.params)
    return res.send({firstName:"Shikha",lastName:"Das"})
})

app.post("/user",(req,res)=>{
    return res.send("Data is pushed successfully")
})
app.delete("/user",(req,res)=>{
    return res.send("Data is deleted successfully")
})

// app.use("/",(req,res)=>{
//    return res.send("Home page of DevTinder")
// })

app.listen(5000,()=>{
    console.log("Server is listening on port no 5000")
})