import express from 'express'
import { Home } from '../Controller/Home.js';

const router = express.Router()

router.get("/",Home)


export default router;