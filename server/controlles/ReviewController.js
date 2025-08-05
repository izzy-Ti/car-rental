import { review } from "../models/review.js"
import {userID } from "../middleware/authMiddleware.js"


export const addReview = async (req,res) =>{
    const {carId} = req.params
    const { rating, comment} = req.body
    try{
        const userid = await userID(req,res)
        const newReview = new review({
            carId,
            userId: userid,
            rating, 
            comment
        })
        newReview.save()
        res.json({success: true, message: 'review posted successfully'})
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }    
}
export const getCarReviews = async (req,res) =>{
    const {carId} = req.params
    try{
        const carReview =await review.find({carId})
        res.json({success: true, message: 'review fetched successfully', reviews: carReview })
    } catch(error){
        res.status(500).json({success: false, message: 'Server error', error: error.message})
    }  
}
