import express, { Request, Response } from "express";
import { authorizedOnly, validate } from "@middlewares";
import { postRepo } from "@repositories";
import { error } from "@helpers";
import { PostCreationInfo } from "types/validation";
import { UserDto } from "types/dto";

const router = express.Router();
const postRouter = express.Router();

router.use("/posts", postRouter);

postRouter.post('/create', authorizedOnly, validate, createPost);
postRouter.get('/delete/:id', authorizedOnly, deletePost);


async function createPost(req: Request, res: Response) {

    const user = req.user as UserDto;
    const { content } = req.validationResult as PostCreationInfo;

    const response = await postRepo.createPost({ content, user, comments: [] });

    if (req.xhr) return res.status(200).json(response);

    req.setFlashMessage('Post created successfully');

    return res.redirect('/');

}


async function deletePost(req: Request, res: Response) {

    const postId = req.params.id;

    const loggedInUser = req.user as UserDto;

    const userResult = await postRepo.getPostUser(postId);

    if (!userResult.success) {
        if (req.xhr) return res.status(400).json(userResult);
        req.setFlashErrors(userResult.errors[0].message);
        return res.redirect('back');
    }

    const postUser = userResult.data;

    if (loggedInUser.id !== postUser.id) {
        const message = 'You are not authorized to delete this post';
        if (req.xhr) return res.status(400).json(error(message));
        req.setFlashErrors(message);
        return res.redirect('back');
    }

    const result = await postRepo.deletePost(postId);

    if (!result.success) {
        if (req.xhr) return res.status(400).json(result);
        req.setFlashErrors(result.errors[0].message);
        return res.redirect('back');
    }

    if (req.xhr) return res.status(200).json(result);

    req.setFlashMessage('Post deleted successfully');
    return res.redirect('back');

}



export { router };
