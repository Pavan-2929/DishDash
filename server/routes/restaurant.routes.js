import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { createRestaurant } from '../controllers/restaurant.controller.js'

const router = express.Router()

router.post("/create", createRestaurant)

export default router