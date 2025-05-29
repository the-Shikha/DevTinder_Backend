const express=require("express");
const app=express();
const connectDB=require("./config/database")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")


app.use(express.json());
app.use(cookieParser())

const authRouter=require("./routes/auth")
const profileRoute=require("./routes/profile")
const connectionRequestRouter=require("./routes/requests")
const userRouter=require("./routes/user")

app.use("/",authRouter)
app.use("/",profileRoute)
app.use("/",connectionRequestRouter)
app.use("/",userRouter)

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
