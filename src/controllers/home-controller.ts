import express, { Request, Response } from "express";
import { postRepo, userRepo } from '@repositories';


const router = express.Router();

// routes

router.get("/", renderIndexPage);

// route handlers

async function renderIndexPage(req: Request, res: Response) {

    const message = req.flash('message');

    const postResults = await postRepo.getPosts();
    const posts = postResults.data;

    const usersResults = await userRepo.getAllUsers();
    const allUsers = usersResults.data;

    return res.render('home/index', { message, posts, allUsers });

}

export { router };
