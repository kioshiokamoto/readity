import { Expose } from 'class-transformer';
import { AfterLoad, BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { makeId, slugify } from '../util/helpers';
import Comment from './Comments';
import Entity from './Entity';
import Sub from './Sub';
import User from './User';
import Vote from './Vote';
@TOEntity('posts')
export default class Post extends Entity {
	constructor(post: Partial<Post>) {
		super();
		Object.assign(this, post);
	}

	@Index()
	@Column()
	identifier: string; //7 character Id

	@Column()
	title: string;

	@Index()
	@Column()
	slug: string;

	@Column({ nullable: true, type: 'text' })
	body: string;

	@Column()
	subName: string;

	@Column()
	username:string

	@ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name:'username',referencedColumnName:'username'})
	user: User;

    @ManyToOne(() => Sub, (sub) => sub.posts)
    @JoinColumn({name:'subName',referencedColumnName:'name'})
	sub: Sub;

	@OneToMany(()=>Comment, comment => comment.post)
	comments: Comment[]

	
	@OneToMany(()=>Vote, vote=>vote.post)
    votes:Vote[]

	@Expose() get url():string{
		return `/r/${this.subName}/${this.identifier}/${this.slug}`
	}

	// protected url:string
	// @AfterLoad()
	// createFields(){
	// 	this.url = `/r/${this.subName}/${this.identifier}/${this.slug}`
	// }


    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }
}
