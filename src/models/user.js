const mongoose=require("mongoose")
const validator = require('validator');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter a valid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong pwd")
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
        
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid url")
            }
        }
    },
    about:{
        type:String,
        default:"This is the default about of the user"
    },
    skills:{
        type:[String]
    }

},{timestamps:true})

userSchema.methods.getJWT=async function (){
    const user=this
    const token=jwt.sign({_id:user._id},"DevTinder@01",{expiresIn:"1d"})
    return token
}

userSchema.methods.validatePwd=async function(inputPwd){
    const user=this;
    const hashPwd=user.password
    const isValid=await bcrypt.compare(inputPwd,hashPwd);
    return isValid
}

const User=mongoose.model("User",userSchema)
module.exports=User
