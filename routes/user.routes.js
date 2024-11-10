import express from 'express'
const router = express.Router()
import { getAllUsers, getAffectedUsers, getOneUser, editOneUser, deleteOneUser } from '../controllers/user.controllers.js'
import { isAuthenticated } from "../middlewares/verifyToken.middleware.js"

router.get('/getAllUsers', isAuthenticated, getAllUsers)
router.get('/getAffectedUsers', getAffectedUsers)
router.get("/getOneUser/:id", getOneUser)
router.put('/edit/:id', isAuthenticated, editOneUser)
router.delete('/delete/:id', deleteOneUser)

export default router