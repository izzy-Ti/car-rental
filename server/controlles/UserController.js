import {userID } from "../middleware/authMiddleware.js"
import { user } from "../models/users.js"


export const getProfile = async (req,res) =>{
    const userid =await userID(req,res)
    try{
        const userProfile = await user.findById(userid)
        res.json({success: true, message: 'Profile fetched successfully', userProfile: userProfile})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    } 
} 
export const updateProfile = async (req,res) =>{
    const userid =await userID(req,res)
    const {name, email} = req.body
    try{
        const userProfile = await user.findByIdAndUpdate(userid, {
            name, email
        }, {new: true})
        res.json({success: true, message: 'profile updated successfully', userProfile: userProfile})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    } 
}