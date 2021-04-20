import { Request, Response, Router } from 'express';
import { isEmpty } from 'class-validator';
import { getRepository } from 'typeorm';
import Sub from '../entities/Sub';
import auth from '../middleware/auth';
import user from '../middleware/user';
import Post from '../entities/Post';

const createSub = async (req: Request, res: Response) => {
	const { name, title, description } = req.body;

	const user = res.locals.user;

	try {
		let errors: any = {};
		if (isEmpty(name)) errors.name = 'Name must not be empty';
		if (isEmpty(title)) errors.title = 'Title must not be empty';

		//SQL QUERY
		const sub = await getRepository(Sub)
			.createQueryBuilder('sub')
			.where('lower(sub.name) = :name', { name: name.toLowerCase() })
			.getOne();
		if (sub) errors.name = 'Sub exists already';
		if (Object.keys(errors).length > 0) {
			throw errors;
		}
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}

	try {
		const sub = new Sub({ name, title, description, user });
		await sub.save();

		res.json(sub);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Something went wrog' });
	}
};
const getSub = async (req: Request, res: Response) => {
	const name = req.params.name;
	try {
		const sub = await Sub.findOneOrFail({ name });
		const posts = await Post.find({
			where: { sub },
			order:{createdAt:'DESC'},
			relations: ['comments', 'votes'],
		});

		sub.posts = posts;

		if (res.locals.user) {
			sub.posts.forEach((p) => p.setUserVote(res.locals.user));
		}

		return res.json(sub);
	} catch (error) {
		console.log(error);
		return res.status(404).json({ error: 'Sub not found' });
	}
};

const router = Router();

router.post('/', user, auth, createSub);
router.get('/:name', user, getSub);

export default router;
