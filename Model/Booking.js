import mongoose from "mongoose";
import { Schema } from "mongoose";



const BookingSchema=new Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"movies",
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
    seatNumber:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        require:true,
    },
    
})


export default mongoose.model("Booking",BookingSchema)