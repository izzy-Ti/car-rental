import express from 'express'
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from '../controlles/CarController.js'
import { JWTchecker } from '../middleware/authMiddleware.js'
import {upload} from '../config/cloudnary.js'

const router = express()

router.post('/', JWTchecker,upload.array('image', 3), createCar)
router.post('/:id', getCarById)
router.put('/:id',JWTchecker,upload.array('image', 3), updateCar)
router.delete('/:id',JWTchecker, deleteCar)
router.get('/', getAllCars)


export default router



//POST http://localhost:5000/api/cars/
//POST http://localhost:5000/api/cars/:id
//PUT http://localhost:5000/api/cars/:id
//DELETE http://localhost:5000/api/cars/:id
// GET http://localhost:5000/api/cars/