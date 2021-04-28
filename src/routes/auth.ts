import { Router } from "express";
const { register, login, logout, me } = require('../controllers/auth')
const { isAuth } = require("../middleware/isAuth")

const router = Router()


router.post('/register', register)
router.post('/login', login)
router.get('/me', isAuth, me)
router.get('/logout', isAuth, logout)

export default router;