import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.ObjectId, ref: 'user'}, 
    carId:{type: mongoose.Schema.ObjectId, ref: 'car'}, 
    startDate:{type: String}, 
    endDate:{type: String}, 
    totalPrice:{type: String}, 
    status:{type: String, enum: ['pending','confirmed', 'canceled'], default: 'pending'}, 
})

export const booking = mongoose.model('booking', bookingSchema)