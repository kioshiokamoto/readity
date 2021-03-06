import { Request, Response, Router } from 'express';
import Comment from '../entities/Comments';
import Post from '../entities/Post';
import Sub from '../entities/Sub';

import auth from '../middleware/auth';
import user from '../middleware/user';

const createPost = async (req: Request, res: Response) => {
	const { title, body, sub } = req.body;

	const user = res.locals.user;

	if (title.trim() === '') {
		res.status(400).json({ title: 'Title must not be empty' });
	}

	try {
		const subRecord = await Sub.findOneOrFail({ name: sub });

		const post = new Post({ title, body, user, subName: subRecord.name });
		await post.save();

		return res.json(post);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Something went wrong' });
	}
};

const getPosts = async (req: Request, res: Response) => {
	const currentPage: number = (req.query.page || 1) as number;
	const postsPerPage: number = (req.query.count || 8) as number;

	try {
		const posts = await Post.find({
			order: {
				createdAt: 'DESC',
			},
			relations: ['comments', 'votes', 'sub'],
			skip: currentPage * postsPerPage,
			take: postsPerPage,
		});

		if (res.locals.user) {
			posts.forEach((p) => p.setUserVote(res.locals.user));
		}

		return res.status(200).json(posts);
	} catch (error) {
		console.log({ error });
		return res.status(500).json({
			error: 'Something went wrong',
		});
	}
};

const getPost = async (req: Request, res: Response) => {
	const { identifier, slug } = req.params;
	try {
		const post = await Post.findOneOrFail(
			{ identifier, slug },
			{
				relations: ['sub', 'votes', 'comments'],
			}
		);

		if (res.locals.user) {
			post.setUserVote(res.locals.user);
		}

		return res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Post not found' });
	}
};

const commentOnPost = async (req: Request, res: Response) => {
	const { identifier, slug } = req.params;
	const { body } = req.body;

	const user = res.locals.user;
	try {
		const post = await Post.findOneOrFail({ identifier, slug });

		const comment = new Comment({
			body,
			user,
			post,
		});

		await comment.save();

		return res.json(comment);
	} catch (error) {
		console.log(error);
		return res.status(404).json({ error: 'Post not found' });
	}
};

const getPostComments = async (req: Request, res: Response) => {
	const { identifier, slug } = req.params;
	try {
		const post = await Post.findOneOrFail({ identifier, slug });

		const comments = await Comment.find({
			where: { post },
			order: { createdAt: 'DESC' },
			relations: ['votes'],
		});

		if (res.locals.user) {
			comments.forEach((c) => c.setUserVote(res.locals.user));
		}

		return res.json(comments);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Something went wrong' });
	}
};

const router = Router();

router.post('/', user, auth, createPost);
router.get('/', user, getPosts);
router.get('/:identifier/:slug', user, getPost);
router.post('/:identifier/:slug/comments', user, auth, commentOnPost);
router.get('/:identifier/:slug/comments', user, getPostComments);

export default router;
