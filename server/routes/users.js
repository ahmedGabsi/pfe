import express from 'express'
import { signIn, signUp, updateUser,getUsers,getUser, deleteUser } from '../controllers/users.js'
import auth  from "../middelwares/auth.js"
import isAdmin from '../middelwares/isAdmin.js'


const router=express.Router()
router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/signup',signUp)
router.post('/signin',signIn)
router.patch('/update/:id',auth,updateUser)
router.delete('/:id',isAdmin,deleteUser)



export default router
