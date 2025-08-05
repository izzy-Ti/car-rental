import mongoose from 'mongoose'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const MONGOBD_URI =process.env.MONGO_URI


export const connectDB = async () =>{
    try{
        await mongoose.connect(MONGOBD_URI).then(()=>{
            console.log(chalk.blue.bold(`Database connected`));
        })
    } catch (error){
        console.log(chalk.red.bold('DB error' + error))
    }
}