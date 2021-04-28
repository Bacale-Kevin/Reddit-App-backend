import { Router } from "express";
const { register } = require('../controllers/auth')

const router = Router()


router.post('/auth/register', register)

export default router;