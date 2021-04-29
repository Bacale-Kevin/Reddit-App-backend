import { Request, Response } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";


exports.commentOnPost = async (req: Request, res: Response) => {
    const { identifier, slug } = req.params
    console.log({identifier, slug})
    const { body } = req.body

    try {
        const post = await Post.findOneOrFail({ identifier, slug })
        console.log({post})

        const comment = new Comment({
            body,
            user: res.locals.user,
            post
        })

        await comment.save()

        return res.json(comment)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: "Post not found" })
    }
}