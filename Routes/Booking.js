import express from 'express'
import { Bookingbyid, Bookings, Deletebooking } from '../Controller/Booking.js';

const bookingRouter = express.Router()

bookingRouter.get("/:id",Bookingbyid)
bookingRouter.post("/",Bookings)
bookingRouter.delete("/:id",Deletebooking)



export default bookingRouter;