import { IsEmail, Min } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
	constructor(user: Partial<User>) {
		super();
		Object.assign(this, user);
	}
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
    @IsEmail()
	@Column({ unique: true })
	email: string;

	@Index()
    @Min(3,{message:'Username must be at leas 3 characters long'})
	@Column({ unique: true })
	username: string;

	@Column()
    @Min(6,{message:'password must be at leas 6 characters long'})
	password: string;

    @UpdateDateColumn()
    updatedAt: Date;
}
