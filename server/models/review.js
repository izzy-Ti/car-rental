import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.ObjectId, ref: 'user'}, 
    carId:{type: mongoose.Schema.ObjectId, ref: 'car'}, 
    rating:{type: Number, min: 1, max: 5}, 
    comment:{type: String},  
})

export const review = mongoose.model('review', reviewSchema)