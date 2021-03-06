import { BeforeInsert, Column, Entity as ToEntity, Index, JoinColumn, ManyToOne } from 'typeorm';

import Entity from './Entity';
import Post from './Post';
import User from './User';

import { makeId } from '../utils/helpers';


@ToEntity('comments')
export default class Comment extends Entity {
    constructor(comment: Partial<Comment>) {
        super()
        Object.assign(this, comment)

    }

    @Index()
    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string
    //* Inverse relation is not neccessary since we don't need a place that we will return just the comments of the user
    @ManyToOne(() => User, /*user => user.posts*/)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Post, post => post.comments, { nullable: false })
    post: Post

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(8)
    }
}