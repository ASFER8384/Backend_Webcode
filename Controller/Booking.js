import mongoose from "mongoose";
import Booking from "../Model/Booking.js";
import Movies from "../Model/Movies.js";
import User from "../Model/User.js";
import { CreateError } from "../utils/CreateError.js";


export const Bookings = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let existMovie;
    let existUser;
    try {
        existMovie = await Movies.findById(movie)
        existUser = await User.findById(user)
    } catch (error) {
        throw (error)
    }
    if (!existMovie) {
        return next(CreateError(404, "Movie Not Found"))
    }
    if (!existUser) {
        return next(CreateError(404, "User Not Found"))
    }


    try {
        let booking = new Booking({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user
        })

        const session = await mongoose.startSession();
        session.startTransaction()
        existUser.bookings.push(booking)
        existMovie.bookings.push(booking)
        await existUser.save({ session })
        await existMovie.save({ session })
        await booking.save({ session })
        session.commitTransaction()

        if (!Booking) {
            return next(CreateError(404, "Invalid Booking"))
        } else {
            res.status(201).json({ booking })
        }
    } catch (error) {
        next(error)
    }
}

export const Bookingbyid = async (req, res, next) => {
    try {
        const movie = await Booking.find({user:req.params.id})
        res.status(200).json(movie)
        console.log(req.params.id)
    } catch (error) {
        next(error)
    }
}

export const Deletebooking = async (req, res, next) => {
    const id = req.params.id
    try {
        let booking = await Booking.findByIdAndRemove(id).populate("user")
        console.log(id)
        const session = await mongoose.startSession()
        session.startTransaction()
        await booking.user.bookings.pull(booking)
        // // await booking.movies.bookings.pull(booking)
        // // await booking.movies.save({ session })
        await booking.user.save({ session })
        session.commitTransaction()
    } catch (error) {
      return  console.log(error)
    }

    if(!booking){
        return res.status(500).json({message:"No"})
    }
    return res.status(200).json({message:"yes"})
}