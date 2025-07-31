import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config/jwt.config';

declare global {
    namespace Express {
        interface Request {
            userid?: string;
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader)
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid authorization header' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userid: string };

        req.userid = decoded.userid;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ 
            error: 'Authentication failed',
            details: error instanceof jwt.JsonWebTokenError ? error.message : 'Unknown error'
        });
    }
}

