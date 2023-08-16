import express from "express";
import { postRepo } from '@repositories';


const router = express.Router();

router.get("/", async function (req, res) {

    const message = req.flash('message');

    const results = await postRepo.getPosts();
    const posts = results.data;

    return res.render('home/index', { message, posts });

});

export { router };
