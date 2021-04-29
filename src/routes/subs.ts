import { Router } from "express";
const { createSub } = require('../controllers/subs')
const { isAuth } = require("../middleware/isAuth")


const router = Router()

router.post('/', isAuth ,createSub)

export default router