import express from 'express'
import { addAdmin, Adminlogin, Getadmin } from '../Controller/Admin.js';

const adminRouter = express.Router()

adminRouter.post("/signup",addAdmin)
adminRouter.post("/login",Adminlogin)
adminRouter.get("/",Getadmin)



export default adminRouter;