import Booking from "../Model/Booking.js";
import User from "../Model/User.js";
import { CreateError } from "../utils/CreateError.js";




export const Getusers = async(req, res, next) => {
    try {
       const users = await User.find()
        if (!users){
            return next(CreateError(404,"User wrong"))
        } 
        res.status(200).json({users})
    } catch (err) {
        next (err)
    }
}


export const Getuser = async(req,res,next) => {
     const user = new User(req.body)
    try {
    const oneuser= await Booking.findOne({user:req.params.id})
        res.status(200).json(oneuser)
    } catch (err) {
        next (err);
    }
}

export const GetoneuserDetails = async(req,res,next) => {
    // const user = new User(req.body)
   try {
   const oneuser= await User.findById(req.params.id)
       res.status(200).json(oneuser)
   } catch (err) {
       next (err);
   }
}


export const UpdateeUser = async(req,res) => {
    try {
    const updateUser=  await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
    } catch (err) {
        throw (err);
    }
}


export const DeleteUser = async(req,res) => {
    // const Deleteusers = new User(req.body)
    try {
     await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    } catch (err) {
        throw (err);
    }
}