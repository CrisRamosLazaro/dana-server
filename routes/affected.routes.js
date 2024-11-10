import express from 'express'
const router = express.Router()
import { getNeededItemsCount } from '../controllers/affected.controllers.js'


router.get('/getNeededItemsCount', getNeededItemsCount)

export default router