import mongoose from "mongoose";


const MoviesSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    actors:[{
        type:String,
        require:true,
    }],
    releaseDate:{
        type:Date,
        require:true,
    },
    poster_url:{
       type:String,
       require:true,
    },
    feature:{
       type:Boolean,
    },
    bookings:[{type:mongoose.Types.ObjectId,ref:"Booking"}],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        require:true,
    }
})


export default mongoose.model("Movies",MoviesSchema)