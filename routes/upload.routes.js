import express from 'express'
const router = express.Router()

import { imageRoute } from '../controllers/upload.controllers.js'
import uploader from './../middlewares/uploader.middleware.js'
import { isAuthenticated } from './../middlewares/verifyToken.middleware.js'

router.post('/image', uploader.single('imageData'), imageRoute)
// router.post('/image', isAuthenticated, uploader.single('imageData'), imageRoute)

export default router