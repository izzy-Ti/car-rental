import express from 'express'
import { addReview, getCarReviews } from '../controlles/ReviewController.js'

const router = express()

router.post('/:carId', addReview)
router.get('/:carId', getCarReviews)


export default router


// POST http://localhost:5000/api/reviews/:carId
// get http://localhost:5000/api/reviews/:carId