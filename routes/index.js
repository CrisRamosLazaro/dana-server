import express from 'express'
import affectedRoutes from './affected.routes.js'
import authRoutes from './auth.routes.js'
import uploadRoutes from './upload.routes.js'
import userRoutes from './user.routes.js'

const router = express.Router()

router.use("/affected", affectedRoutes)
router.use("/auth", authRoutes)
router.use("/upload", uploadRoutes)
router.use("/users", userRoutes)

export default router
