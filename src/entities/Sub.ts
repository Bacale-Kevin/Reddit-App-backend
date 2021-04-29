import { Entity as ToEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Entity from './Entity';
import User from "./User";
import Post from "./Post";
import { makeId, slugify } from "../utils/helpers";

@ToEntity('subs')
export default class Sub extends Entity {

    /**
     ** Exclude specifies the different fields to be excluded
     */
    constructor(sub: Partial<Sub>) {
        super()
        Object.assign(this, sub)

    }

    @Index()
    @Column({ unique: true})
    name: string

    @Column()
    title: string

    @Column({ type: 'text', nullable: true})
    description: string

    @Column({ nullable: true})
    imageUrn: string

    @Column({ nullable: true})
    bannerUrn: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username'})
    user: User 

    @OneToMany(() => Post, post => post.sub)
    posts: Post[]



}
