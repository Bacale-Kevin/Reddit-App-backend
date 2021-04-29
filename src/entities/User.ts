import { IsEmail, Length } from "class-validator";
import { Entity as ToEntity, Column, Index, BeforeInsert, OneToMany } from "typeorm";
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import Entity from './Entity';
import Post from "./Post";

@ToEntity('users')
export default class User extends Entity {

    /**
     ** Exclude specifies the different fields to be excluded
     */
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)

    }

    @Index()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Index()
    @Length(3, 255, { message: "Username must be at least 3 characters long" })
    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    @Length(6, 255)
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: [];

    // before a record is created in the database do this
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }


}
