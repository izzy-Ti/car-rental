import { user } from "../models/users.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const JWTchecker = async (req,res,next) =>{
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({success: false, message: 'please login'})
        }
        const decoded = jwt.verify(token, process.env.HASH_KEY)
        if (!decoded) {
            return res.status(401).json({success: false, message: 'invalid token'})
        }
        next()
    } catch (err) {
        return res.status(401).json({success: false, message: 'unauthorized'})
    }
}

export const userID = async (req,res) =>{
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.HASH_KEY)
        return decoded.id
    } catch (err) {
        return null
    }
}