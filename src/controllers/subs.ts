import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Sub from "../entities/Sub";
import User from "../entities/User";




exports.createSub = async (req: Request, res: Response) => {
    const { title, name, description } = req.body


    const user: User = res.locals.user

    try {
        let errors: any = {}
        if(isEmpty(name)) errors.name = 'Name must not be empty'
        if(isEmpty(title)) errors.name = 'Title must not be empty'

        //comparing both names and ensuring that they are both in lowercase
        const sub = await getRepository(Sub)
            .createQueryBuilder('sub')
            .where('lower(sub.name) = :name', { name: name.toLowerCase()})
            .getOne()

        if(sub) errors.name = 'Sub exists already'

        if(Object.keys(errors).length > 0) throw errors

        
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err})
    }

    //if nvalidation error lets proceed
    try {
        const sub = new Sub({ name, description, title, user})

        await sub.save()

        return res.json(sub)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong'})
    }
}