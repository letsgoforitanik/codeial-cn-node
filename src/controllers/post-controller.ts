import express, { Request, Response } from "express";
import { authorizedOnly } from "@middlewares";
import { postRepo } from "@repositories";
import { validate } from "@helpers";
import { PostCreationInfo } from "types/validation";
import { UserDto } from "types/dto";

const router = express.Router();
const postRouter = express.Router();

router.use("/posts", postRouter);

postRouter.post('/create', authorizedOnly, createPost);
postRouter.get('/delete/:id', authorizedOnly, deletePost);


async function createPost(req: Request, res: Response) {

    const result = validate<PostCreationInfo>(req);

    if (!result.success) {
        req.setFlashErrors(result.errors[0].message);
        return res.redirect('back');
    }

    const user = req.user as UserDto;
    const content = result.data.content;

    await postRepo.createPost({ content, user: { id: user.id }, comments: [] });

    req.setFlashMessage('Post created successfully');

    return res.redirect('/');

}


async function deletePost(req: Request, res: Response) {

    const postId = req.params.id;

    const loggedInUser = req.user as UserDto;

    const userResult = await postRepo.getPostUser(postId);

    if (!userResult.success) {
        req.setFlashErrors(userResult.errors[0].message);
        return res.redirect('back');
    }

    const postUser = userResult.data;

    if (loggedInUser.id !== postUser.id) {
        req.setFlashErrors('You are not authorized to delete this post');
        return res.redirect('back');
    }

    const result = await postRepo.deletePost(postId);

    if (!result.success) req.setFlashErrors(result.errors[0].message);
    else req.setFlashMessage('Post deleted successfully');

    return res.redirect('back');

}



export { router };
