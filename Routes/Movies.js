import express from 'express'
import { Addmovie, Deletemovie, Getmovie, Getmovies, Updatemovie } from '../Controller/Movies.js';

const moviesRouter = express.Router()

moviesRouter.post("/",Addmovie)
moviesRouter.get("/:id",Getmovie)
moviesRouter.get("/",Getmovies)
moviesRouter.delete("/:id",Deletemovie)
moviesRouter.put("/:id",Updatemovie)



export default moviesRouter;