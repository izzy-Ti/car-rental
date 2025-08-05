import { car } from "../models/car.js"
import {userID } from "../middleware/authMiddleware.js"

export const createCar = async (req,res) =>{
    const {brand, model, year, pricePerDay, location, availability} = req.body
    const image = req.files.map(file => file.path)
    try{
        const userid = await userID(req,res)
        const newCar = new car({
            userId: userid,
            brand, 
            image,
            model, 
            year, 
            pricePerDay, 
            location, 
            availability
        })
        await newCar.save()
        res.json({success: true, message: 'car registered successfully', car: newCar})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
} 
export const getAllCars = async (req,res) =>{
    try{
        const cars = await car.find({})
        res.json({success: true, message: 'car fetched successfully', car: cars})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
}
export const getCarById = async (req,res) =>{
    const {id} = req.params
    try{
        const cars = await car.findById(id)
        res.json({success: true, message: 'car fetched successfully', car: cars})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
}
export const updateCar = async (req,res) =>{
    const {id} = req.params
    const {brand, model, year, pricePerDay, location, availability} = req.body
    const image = req.files.map(file => file.path)
    try{
        const newCar =await car.findByIdAndUpdate(id,{
            brand, 
            image,
            model, 
            year, 
            pricePerDay, 
            location, 
            availability
        },{new: true})
        res.json({success: true, message: 'car updated successfully', car: newCar})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
}
export const deleteCar = async (req,res) =>{
    const {id} = req.params
    try{
        const cars = await car.findByIdAndDelete(id)
        res.json({success: true, message: 'car deleeted successfully'})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
}
