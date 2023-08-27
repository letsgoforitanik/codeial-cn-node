import express, { Request, Response } from "express";
import { postRepo } from "@repositories";

const router = express.Router();
const postRouter = express.Router();

// routes 

router.use("/posts", postRouter);

postRouter.get("/", getPosts);
postRouter.delete("/:id", deletePost);
postRouter.get('/:id', getPost);

// route handlers

async function getPosts(req: Request, res: Response) {
    const postResponse = await postRepo.getPosts();
    return res.ok(postResponse);
}

async function deletePost(req: Request, res: Response) {
    const postId = req.params.id;
    await postRepo.deletePost(postId);
    return res.ok({ success: true, message: 'Post deleted successfully' });
}

async function getPost(req: Request, res: Response) {
    const postId = req.params.id;
    const response = await postRepo.getPost(postId);
    if (!response.success) return res.notFound();
    return res.success(response.data);
}


export { router }