import { Router } from "express";
const { isAuth } = require("../middleware/isAuth")
const { createPost, getPosts, getPost } = require('../controllers/posts')

const router = Router()

router.post('/', isAuth ,createPost)
router.get('/', getPosts)
router.get('/:identifier/:slug', getPost)

export default router;