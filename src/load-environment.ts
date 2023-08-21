import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    const environment = process.env.NODE_ENV ?? 'development';
    console.log('Environment -> ', environment);
    dotenv.config();
}