import bcrypt from 'bcrypt'
import User from '../Model/User.js';
import {CreateError} from '../utils/CreateError.js'

export const Createuser = async(req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const Newuser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
       const createuser = await Newuser.save() 
        res.status(200).json("User Created")
    } catch (err) {
        next (err)
    }
}

export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(CreateError(409, "Username Wrong"))

        const Password = await bcrypt.compare(req.body.password, user.password)
        if (!Password) return next(CreateError(404, "Password Wrong"))

        // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...OtherDetails } = user._doc

        res.status(200).json({ ...OtherDetails })
    } catch (err) {
        next(err)
    }
}