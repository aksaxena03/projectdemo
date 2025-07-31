import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set in environment variables');
    process.exit(1);
}

export const JWT_SECRET = process.env.JWT_SECRET;