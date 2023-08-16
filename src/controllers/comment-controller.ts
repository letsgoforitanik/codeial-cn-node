import express from 'express';
import { authorizedOnly } from '@middlewares';
import { commentRepo } from '@repositories';
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

    const response = await commentRepo.addComment({ post: { id: postId }, user, content });

    if (!response.success) {
        req.flash('message', response.errors[0].message);
        return res.redirect('back');
    }

    req.flash('message', 'Comment added successfully');

    return res.redirect('back');

});

export { router };
