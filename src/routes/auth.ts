import { Request, Response, Router } from 'express';
import { User } from '../entities/User';

const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	try {
		// TODO: Validate data

		// TODO: Create de user
		const user = new User({ email, username, password });
        await user.save();
		// TODO: Return the user
        return res.status(201).json(user);
	} catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
};

const router = Router();
router.post('/', register);

export default router;
