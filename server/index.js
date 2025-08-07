import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import chalk from 'chalk'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import auth from './routes/Authroute.js'
import car from './routes/carroute.js'
import review from './routes/Reviewroute.js'
import booking from './routes/Bookingroute.js'
import users from './routes/Userroute.js'

dotenv.config()
await connectDB()

const port = process.env.PORT
const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://drivasy.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', auth)
app.use('/api/reviews', review)
app.use('/api/cars', car)
app.use('/api/bookings', booking)
app.use('/api/users', users)

app.get('/normal', (req,res) =>{
    res.json({abebe: 'abebe'})
})

app.listen(port || 5000, () =>{
    console.log(chalk.blue.bold(`server is running on ${port}`))
})