import express from 'express'
import { getProfile, updateProfile } from '../controlles/UserController.js'

const router = express()

router.get('/', getProfile)
router.put('/', updateProfile)


export default router

//get http://localhost:5000/api/users/
//put http://localhost:5000/api/users/
