import { IsEmail, Length } from 'class-validator';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt'
import {classToPlain, Exclude} from 'class-transformer'
@Entity('users')
export class User extends BaseEntity {
	constructor(user: Partial<User>) {
		super();
		Object.assign(this, user);
	}
	@Exclude()
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
    @IsEmail()
	@Column({ unique: true })
	email: string;

	@Index()
    @Length(3,255,{message:'Username must be at leas 3 characters long'})
	@Column({ unique: true })
	username: string;

	@Exclude()
	@Column()
    @Length(6)
	password: string;

    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;

	@BeforeInsert()
	async hasPassword(){
		this.password = await bcrypt.hash(this.password,6)
	}
	toJSON(){
		return classToPlain(this)
	}
}
