import express from "express"
import { getPaymentByBuyer, getPaymentBySeller, getPayments } from "../controllers/payments.js"
import auth  from "../middelwares/auth.js"
const router=express.Router()
router.get("/",getPayments)
router.get("/buyer/:id",auth,getPaymentByBuyer)
router.get("/seller/:id",auth,getPaymentBySeller)




export default router