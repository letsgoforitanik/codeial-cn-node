import dotenv from 'dotenv';

const environment = process.env.NODE_ENV ?? 'development';

if (environment !== 'production') {
    console.log('Environment -> ', environment);
    dotenv.config();
}