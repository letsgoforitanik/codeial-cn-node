import express, { Request, Response } from "express";
import { postRepo, userRepo } from '@repositories';
import { UserDto } from "types/dto";


const router = express.Router();

// routes

router.get("/", renderIndexPage);

// route handlers

async function renderIndexPage(req: Request, res: Response) {

    const postResults = await postRepo.getPosts();
    const posts = postResults.data;

    const user = req.user as UserDto;

    const loggedInUserId = req.isAuthenticated() ? user.id : null;

    const usersResults = await userRepo.getAllUsers(loggedInUserId);
    const allUsers = usersResults.data;

    return res.render('home/index', { posts, allUsers });

}

export { router };
