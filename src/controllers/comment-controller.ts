import express, { Request, Response } from 'express';
import { authorizedOnly } from '@middlewares';
import { postRepo } from '@repositories';
import { error, validate } from '@helpers';
import { CommentCreationInfo } from 'types/validation';
import { UserDto } from 'types/dto';

const router = express.Router();
const commentRouter = express.Router();

// routes

router.use("/comments", commentRouter);

commentRouter.post('/create', authorizedOnly, createComment);
commentRouter.get('/delete/:id', authorizedOnly, deleteComment);


// route handlers


async function createComment(req: Request, res: Response) {

    const result = validate<CommentCreationInfo>(req);

    if (!result.success) {
        if (req.xhr) return res.status(400).json(result);
        req.setFlashErrors(result.errors[0].message);
        return res.redirect('back');
    }

    const { content, postId } = result.data;
    const user = req.user as UserDto;

    const response = await postRepo.addCommentToPost({ post: { id: postId }, user, content });

    if (!response.success) {
        if (req.xhr) return res.status(400).json(response);
        req.setFlashErrors(response.errors[0].message);
        return res.redirect('back');
    }

    if (req.xhr) return res.status(200).json(response);

    req.setFlashMessage('Comment added successfully');
    return res.redirect('back');

}



async function deleteComment(req: Request, res: Response) {

    const commentId = req.params.id;
    const loggedInUser = req.user as UserDto;

    const userResult = await postRepo.getCommentUser(commentId);

    if (!userResult.success) {
        if (req.xhr) return res.status(400).json(userResult);
        req.setFlashErrors(userResult.errors[0].message);
        return res.redirect('back');
    }

    const commentUser = userResult.data;

    if (loggedInUser.id !== commentUser.id) {
        const message = 'Unauthorised to delete comment';
        if (req.xhr) return res.status(400).json(error(message));
        req.setFlashErrors(message);
        return res.redirect('back');
    }

    const response = await postRepo.deleteCommentFromPost(commentId);

    if (!response.success) {
        if (req.xhr) return res.status(400).json(response);
        req.setFlashErrors(response.errors[0].message);
        return res.redirect('back');
    }

    if (req.xhr) return res.status(200).json(response);

    req.setFlashMessage('Comment deleted successfully');
    return res.redirect('back');
}



export { router };
