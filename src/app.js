const express=require("express");
const app=express();
const connectDB=require("./config/database")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const cors=require("cors")


app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],  // explicitly allow PATCH
  allowedHeaders: ["Content-Type", "Authorization"] // add other headers if you use them
}))


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
