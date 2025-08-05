import express from 'express'
import { login, logout, register } from '../controlles/AuthController.js'

const router = express()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)


export default router



//POST http://localhost:5000/api/auth/logout
//POST http://localhost:5000/api/auth/login
//POST http://localhost:5000/api/auth/register