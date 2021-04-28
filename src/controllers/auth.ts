import { Request, Response } from "express";
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import dotenv from 'dotenv';

dotenv.config()

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



exports.login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // let errors: any = {}

        // if (isEmpty(username)) return errors.username = "Username must not be empty"
        // if (isEmpty(password)) return errors.password = "Password must not be empty"

        // //need to send the error response to the client
        // if (Object.keys(errors).length > 0) return res.status(400).json(errors)

        if (username.length === 0 && password.length === 0) res.json({ username: "Username must not be empty", password: "Password must not be empty" })
        if (username.length === 0) return res.status(400).json({ username: "Username must not be empty" })
        if (password.length === 0) return res.status(400).json({ password: "Password must not be empty" })

        const user = await User.findOne({ username })
        console.log({ username });
        if (!user) return res.status(404).json({ error: "User not found" })

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) return res.status(401).json({ password: 'Password is incorrect' })

        //returnig a token
        const token = jwt.sign({ username }, process.env.JWT_SECRET)

        // res.set() is a method used to setHeaders when sending back a response to the client
        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true, //can not be access by client javascript
            secure: process.env.NODE_ENV === 'production', // cookie can only be transfered through https in development is obviously set to false
            sameSite: 'strict', // accessible on;y on our domain
            maxAge: 3600, // expiry date in seconds
            path: '/' //means the cookie is valid accross all our application 
        }))

        return res.json({ user })
    } catch (err) {
        console.log(err)
    }


}


exports.logout = (_: Request, res: Response) => {

    res.set('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true, //can not be access by client javascript
        secure: process.env.NODE_ENV === 'production', // cookie can only be transfered through https in development is obviously set to false
        sameSite: 'strict', // accessible on;y on our domain
        expires: new Date(0), // expires immidiately 
        path: '/' //means the cookie is valid accross all our application 
    }))

    res.status(200).json({ success: true })
}

exports.me = (_: Request, res: Response) => {

    return res.json(res.locals.user)

}