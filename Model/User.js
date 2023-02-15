import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    }, email:{
        type:String,
        require:true,
        unique:true,
    }, password:{
        type:String,
        require:true,
        minLength:6,
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Booking"
    }]
})


export default mongoose.model("User",UserSchema)