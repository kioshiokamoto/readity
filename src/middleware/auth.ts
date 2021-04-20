import { NextFunction, Request, Response } from 'express';
import User from '../entities/User';

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user:User | undefined = res.locals.user;

		if (!user) throw new Error('Unauthenticated');

		res.locals.user = user;

		return next();
	} catch (error) {
		return res.status(401).json({ error: 'Unauthenticated' });
	}
};
