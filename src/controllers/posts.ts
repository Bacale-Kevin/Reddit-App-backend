import { Request, Response } from "express";
import Post from "../entities/Post";
import Sub from "../entities/Sub";



/**
 * * When creating a post specify the Sub in which it belongs and the user writing the post
 */
exports.createPost = async (req: Request, res: Response) => {
    const { title, body, sub } = req.body


    const user = res.locals.user

    if (title.trim() === '') return res.status(400).json({ title: 'Title must not be empty' })

    try {

        const subRecord = await Sub.findOneOrFail({ name: sub })

        const post = new Post({ title, body, user, sub: subRecord })
        await post.save()

        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}


exports.getPosts = async (_: Request, res: Response) => {
    try {
        const posts = await Post.find({
            order: { createdAt: 'DESC' },
            // relations: ['sub']
        })

        return res.json(posts)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wromg" })
    }
}

exports.getPost = async (req: Request, res: Response) => {

    const { identifier, slug } = req.params
    try {
        const post = await Post.findOneOrFail({ identifier, slug }, { relations: ['sub'] })

        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: "Post not found" })
    }
}