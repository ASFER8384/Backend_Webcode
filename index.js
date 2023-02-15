import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'

// import middlewares
import userRouter from './Routes/User.js'
import authRouter from './Routes/Auth.js'
import adminRouter from './Routes/Admin.js'
import moviesRouter from './Routes/Movies.js'
import bookingRouter from './Routes/Booking.js'
import homeRouter from './Routes/Home.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
// middlewares
app.use("/",homeRouter)
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/movies",moviesRouter)
app.use("/booking",bookingRouter)



app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.messagr || "something went wrong"
    res.status(errStatus).json({
        sucess:false,
        status:err.status,
        message:err.message,
        stack:err.stack,
    })
})


// mongoose connection
const Connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected")
    } catch (err) {
        throw (err);
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB is offline")
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB is online")
})


// server port
app.listen(PORT, () => {
    Connect()
    console.log("Backend Connected!")
})