import {userID } from "../middleware/authMiddleware.js"
import { booking } from "../models/booking.js"
import { car } from "../models/car.js"


export const createBooking = async (req,res) =>{
    const {carId} = req.params
    const {startDate, endDate,  status} = req.body
    const Bookedcar = await car.findById(carId) 

    try{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const oneDay = 1000 * 60 * 60 * 24
        const diffInMs = end - start
        const days = Math.ceil(diffInMs / oneDay)
        const totalPrice = days * Bookedcar.pricePerDay
        const userid = await userID(req,res)
        const newBooking = new booking({
            carId,
            userId: userid,
            startDate, 
            endDate, 
            totalPrice, 
            status
        })
        newBooking.save()
        res.json({success: true, message: 'booking saved successfully', booking: newBooking})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }  
} 
export const getUserBookings = async (req,res) =>{
    const userid = await userID(req,res)
    try{
        const userBooking = await booking.find({userId: userid})
        res.json({success: true, message: 'booking fetched successfully', userBooking: userBooking})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }     
} 
export const getAllBookings = async (req,res) =>{
    try{
        const allBookings = await booking.find()
        res.json({success: true, message: 'booking fetched successfully', allBookings: allBookings})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }    
} 
export const updateBookingStatus = async (req,res) =>{
    const {id} = req.params
    const {status} = req.body
    try{
        const updateBooking = await booking.findByIdAndUpdate(id,{
            status
        },{new:true})
        res.json({success: true, message: 'status updated successfully', updateBooking: updateBooking})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    } 
} 
