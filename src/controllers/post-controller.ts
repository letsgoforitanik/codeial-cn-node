import express from "express";
import { authorizedOnly } from "@middlewares";
import { postRepo } from "@repositories";
import { validate } from "@helpers";
import { PostCreationInfo } from "types/validation";
import { UserDto } from "types/dto";

const router = express.Router();
const postRouter = express.Router();

router.use("/posts", postRouter);

postRouter.post('/create', authorizedOnly, async function (req, res) {

    const result = validate<PostCreationInfo>(req);

    if (!result.success) {
        return res.render('home/index', {
            errorMessage: result.errors[0].message,
            data: req.body
        });
    }

    const user = req.user as UserDto;
    const content = result.data.content;

    const response = await postRepo.createPost({ content, user });

    if (!response.success) {
        return res.render('home/index', {
            errorMessage: response.errors[0].message,
            data: req.body
        });
    }


    req.flash('message', 'Post created successfully');

    return res.redirect('/');

});



export { router };
