import express from 'express';

const router = express.Router();

router.get('/internal-server-error', (req, res) => res.send('Sorry!! for inconvenience. Try again later'));

export { router };