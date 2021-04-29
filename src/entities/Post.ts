import { Entity as ToEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import Entity from './Entity';
import User from "./User";
import { makeId, slugify } from "../utils/helpers";
import Sub from "./Sub";

@ToEntity('posts')
export default class Post extends Entity {

    /**
     ** Exclude specifies the different fields to be excluded
     */
    constructor(post: Partial<Post>) {
        super()
        Object.assign(this, post)

    }

    @Index()
    @Column()
    identifier: string // 7 character Id

    @Index()
    @Column()
    title: string

    @Index()
    @Column()
    slug: string
    
    @Column({ nullable: true, type: 'text'}) // can take a long text
    body: string

    @Column() 
    subName: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username'})
    user: User 

    @ManyToOne(() => Sub, sub => sub.posts)
    /**
     * * The joinColumn specifies the refence of the child table to the parent table here subName field in the Post table will have a reference
     * * to the name field in the Sub table there by there is a link
     */
    @JoinColumn({ name: 'subName', referencedColumnName: 'name'})
    sub: Sub 

    /**
     * * Before inserting provide a new identifier and slugify the title using this verious methods found in the helper function
     */
    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }


}
