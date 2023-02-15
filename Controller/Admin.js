import Admin from '../Model/Admin.js';
import { CreateError } from '../utils/CreateError.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body
    let existAdmin;
    try {
        existAdmin = await Admin.findOne({ email:req.body.email })

        if (existAdmin) {
            return next(CreateError(400, "Admin Already Exist"))
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        try {

            const admin = new Admin({
                email: req.body.email,
                password: hash,
            })
            const newAdmin = admin.save()

            if (!admin) {
                return next(CreateError(200, "Not Found"))
            }
            res.status(200).json("ADMIN CREATED")

        } catch (err) {
            next(err)
        }

    } catch (err) {
        next(err)
    }
}


export const Adminlogin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) return next(CreateError(409, "Admin Wrong"))

        const Password = await bcrypt.compare(req.body.password, admin.password)

        if (!Password) return next(CreateError(404, "Password Wrong"))
     

        const token = jwt.sign({id:admin._id},process.env.JWT,{expiresIn:"7d"})

       return res.status(200).json({token,id:admin._id})

    } catch (err) {
        next(err)
    }
}


export const Getadmin=async(req,res,next)=>{
    try {
        const admins = await Admin.find()

        if(!admins){
            return next(404,"Admin Not Found")
        }else{
            return res.status(200).json({admins})
        }
    } catch (error) {
        next(error)
    }
}