import { Request, Response, Router } from 'express';
import { User } from '../entities/User';
import {validate} from 'class-validator'

const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	try {
		// TODO: Validate data

		// TODO: Create de user
		const user = new User({ email, username, password });

		const errors = await validate(user);

		if(errors.length > 0){
			return res.status(400).json({errors})
		}
        await user.save();
		// TODO: Return the user
        return res.status(201).json(user);
	} catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
};

const router = Router();
router.post('/register', register);

export default router;
