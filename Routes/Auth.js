import express from 'express'
import { Createuser, Login } from '../Controller/Auth.js';

const router = express.Router()

router.post("/reg",Createuser)
router.post("/login",Login)


export default router;