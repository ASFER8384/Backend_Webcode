import { CreateError } from "../utils/CreateError.js";
import Movies from '../Model/Movies.js';

import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Admin from "../Model/Admin.js";


export const Addmovie= async(req,res,next)=>{

    const extracttoken = req.headers.authorization.split(" ")[1]

    if(!extracttoken){
        return next(CreateError(404,"Token Not Found"))
    }

    let adminId;
    //verfiy token
    jwt.verify(extracttoken,process.env.JWT,(err,decrypted)=>{
        if(err){
            next(err)
        }else{
            adminId = decrypted.id;
            console.log(adminId)
            return;
        }
    })

    //create movies
    const {title,description,releaseDate,poster_url,featured,actors,}=req.body;

    
    try {
        let movies= new Movies({
            title,
            poster_url,
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin:adminId,
        })

        const session =await mongoose.startSession()
        const adminUser= await Admin.findById(adminId)
        session.startTransaction();
         await movies.save({session});
         adminUser.added_movies.push(movies);
         await adminUser.save({session});
         await session.commitTransaction();
        if(!movies){
            return next(CreateError(404,"Request Failed"))
        }else{
            res.status(200).json(movies)
        }
       
        
    } catch (err) {
        next(err)
    }

}

export const Getmovies= async(req, res, next) => {
    try {
       const movies = await Movies.find()
        if (!movies){
            return next(CreateError(404,"User wrong"))
        } 
        res.status(200).json({movies})
    } catch (err) {
        next (err)
    }
}


export const Getmovie = async(req,res,next) => {
     const movie = new Movies(req.body)
    try {
    const onemovie= await Movies.findById(req.params.id)
        res.status(200).json(onemovie)
    } catch (err) {
        next (err);
    }
}


export const Updatemovie = async(req,res) => {
    try {
    const updatemovie=  await Movies.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatemovie)
    } catch (err) {
        throw (err);
    }
}


export const Deletemovie = async(req,res) => {
    // const Deleteusers = new User(req.body)
    try {
     await Movies.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    } catch (err) {
        throw (err);
    }
}