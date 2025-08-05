import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String}, 
    email:{type: String}, 
    password:{type: String}, 
    role : {type: String, enum: ['ADMIN', 'USER']}
})

export const user = mongoose.model('user', userSchema)