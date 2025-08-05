import { user } from "../models/users.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const JWTchecker = async (req,res,next) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.HASH_KEY);
    const userID = decoded._id
    if(!token || !decoded){
        return res.status(500).json({success: false, message: 'please login'})
    }
    next()
}

export const userID = async (req,res) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.HASH_KEY);
    const userID = decoded.id
    return userID
}