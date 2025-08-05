import { user } from "../models/users.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const register = async (req,res) =>{
    const {name, email, password} = req.body
    const Emailofuser = await user.findOne({email})
    if(Emailofuser){
        return res.status(409).json({success: false, message: 'email already exist'})
    }
    try{
        const hashedpassword = await bcrypt.hash(password, 15)
        const newUser = new user({
            name, 
            email, 
            password: hashedpassword, 
        })
        await newUser.save()
        const token =jwt.sign({id: newUser._id}, process.env.HASH_KEY)
        res.cookie('token', token)
        res.json({success: true, message: 'User registered successfully', user: newUser})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
} 

export const login = async (req,res) =>{
    const {email, password} = req.body
    try{
        const loggedUser =await user.findOne({email})
        
        if(!loggedUser || !(await bcrypt.compare(password, loggedUser.password))){
            return res.status(404).json({success: false, message: 'User not found'})
        }
        const token =jwt.sign({id: loggedUser._id}, process.env.HASH_KEY)
        res.cookie('token', token)
        res.json({success: true, message: 'Login successful' , user: loggedUser})
    } catch (error){
        return res.status(500).json({success: false, message: 'system error', error: error.message})
    }
} 
export const logout = async (req,res) =>{
    const token = req.cookies.token;
    try{
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })
    res.json({success: true, message: 'Logout successful'})
    } catch (error){
        return res.status(500).json({success: false, message: 'system error', error: error.message})
    }
}