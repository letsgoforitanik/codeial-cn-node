import express from 'express';

const router = express.Router();

router.get('/internal-server-error', (req, res) => res.send('Internal Server Error. Sorry!!'));

router.get('/not-found', (req, res) => res.send('Resource Not Found. Sorry!!'));

router.get('/google-signin-error', (req, res) => res.send('Google authentication not successful'));

router.use('/', (req, res) => res.redirect('/not-found'));

export { router };