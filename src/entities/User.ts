import { IsEmail, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, BeforeInsert } from "typeorm";
import bcrypt from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {

    /**
     ** Exclude specifies the different fields to be excluded
     */
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)

    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date

    // before a record is created in the database do this
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

    /**
     * * classToPlain move accross our fields and specifies which fields to be excluded and return the rest
     */
    toJSON() {
        return classToPlain(this)
    }

}
