import express from 'express'
import {  DeleteUser, GetoneuserDetails, Getuser, Getusers, UpdateeUser } from '../Controller/User.js'

const router = express.Router()

router.get("/",Getusers)
router.put("/:id",UpdateeUser)
router.get("/:id",Getuser)
router.get("/profile/:id",GetoneuserDetails)
router.delete("/:id",DeleteUser)

export default router;