import { Router } from "express";
const { isAuth } = require("../middleware/isAuth")
const { commentOnPost } = require('../controllers/comment')

const router = Router()

router.post('/:identifier/:slug/comments', isAuth, commentOnPost)

export default router;