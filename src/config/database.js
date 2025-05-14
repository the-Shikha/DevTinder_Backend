const mongoose=require("mongoose")
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://shikhakumari152019:MKVu4sQjC7AH2EeE@namastenode.tr0prgl.mongodb.net/DevTinder")
}
module.exports=connectDB