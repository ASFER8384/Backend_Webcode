import mongoose from "mongoose";


const AdminSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    }, password:{
        type:String,
        require:true,
        minLength:6,
    }, added_movies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movies",
    }]
})


export default mongoose.model("Admin",AdminSchema)