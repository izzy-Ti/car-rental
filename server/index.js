import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import chalk from 'chalk'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()
await connectDB()

const port = process.env.PORT
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.get('/normal', (req,res) =>{
    res.json({abebe: 'abebe'})
})

app.listen(port || 5000, () =>{
    console.log(chalk.blue.bold(`server is running on ${port}`))
})