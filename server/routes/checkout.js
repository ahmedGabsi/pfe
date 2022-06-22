import express from 'express'
import { createCheckout } from '../controllers/checkout.js'

const router=express.Router()
router.post('/',createCheckout)


export default router
