import { NextFunction, Request, Response } from "express";

export default (req: Request, _: Response, next: NextFunction) => {

    const exceptions = ['password']

    //* Looping through request body values
    Object.keys(req.body).forEach(key => {
        if (!exceptions.includes(key) && typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim()
        }
    })

    next()
}