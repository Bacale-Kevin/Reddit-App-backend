import { Router } from "express";
const { isAuth } = require("../middleware/isAuth")
const { createPost } = require('../controllers/posts')

const router = Router()

router.post('/', isAuth ,createPost)

export default router;