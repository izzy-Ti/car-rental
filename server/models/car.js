import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    brand:{type: String}, 
    model:{type: String}, 
    year:{type: String}, 
    image:{type: [String], required: true}, 
    pricePerDay:{type: Number}, 
    location:{type: String}, 
    availability : {type: String}
})

export const car = mongoose.model('car', carSchema)