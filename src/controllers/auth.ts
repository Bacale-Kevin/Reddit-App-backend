import { Request, Response } from "express";
import { validate } from 'class-validator';

import { User } from "../entities/User";


exports.register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // TODO: Validate data

        let errors: any = {}
        const emailUser = await User.findOne({ email });
        const usernameUser = await User.findOne({ username });

        //if exist
        if (emailUser) errors.email = "Email is already taken";
        if (usernameUser) errors.username = "Username is already taken";

        //returning an error if there is one
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        // TODO: Create ther user
        const user = new User({ email, username, password })
        errors = await validate(user)
        if (errors.length > 0) return res.status(400).json({ errors })
        await user.save()
        // TODO: Return ther user
        return res.json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}




