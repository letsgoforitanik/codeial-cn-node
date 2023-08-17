import express from 'express';
import { authorizedOnly } from '@middlewares';
import { postRepo } from '@repositories';
import { validate } from '@helpers';
import { CommentCreationInfo } from 'types/validation';
import { UserDto } from 'types/dto';

const router = express.Router();
const commentRouter = express.Router();

router.use("/comments", commentRouter);

commentRouter.post('/create', authorizedOnly, async function (req, res) {

    const result = validate<CommentCreationInfo>(req);

    if (!result.success) {
        req.flash('message', result.errors[0].message);
        return res.redirect('back');
    }

    const { content, postId } = result.data;
    const user = req.user as UserDto;

    const response = await postRepo.addCommentToPost({ post: { id: postId }, user, content });

    if (!response.success) req.flash('errorMessage', response.errors[0].message);
    else req.flash('message', 'Comment added successfully');

    return res.redirect('back');

});


commentRouter.get('/delete/:id', authorizedOnly, async function (req, res) {

    const commentId = req.params.id;
    const loggedInUser = req.user as UserDto;

    const response = await postRepo.deleteCommentFromPost(commentId, loggedInUser.id);

    if (!response.success) req.flash('errorMessage', response.errors[0].message);
    else req.flash('message', 'Comment deleted successfully');

    return res.redirect('back');

});



export { router };
