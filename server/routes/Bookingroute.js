import express from 'express'
import { createBooking, getAllBookings, getUserBookings, updateBookingStatus } from '../controlles/BookingController.js'

const router = express()

router.post('/:carId', createBooking)
router.get('/user', getUserBookings )
router.get('/', getAllBookings)
router.patch('/:id', updateBookingStatus)


export default router


//POST http://localhost:5000/api/bookings/:carId
//get http://localhost:5000/api/bookings/user
//get http://localhost:5000/api/bookings/
//patch http://localhost:5000/api/bookings/:id


