import express, { Request, Response, NextFunction } from "express";
import { validate } from "@helpers";
import { userRepo } from "@repositories";
import { passport } from '@config';
import { ProfileUpdateInfo, SignUpInfo } from "types/validation";
import { anonymousOnly, authorizedOnly } from "@middlewares";
import { UserDto } from "types/dto";


const router = express.Router();
const userRouter = express.Router();

// routes

router.use("/users", userRouter);

userRouter.get("/sign-up", anonymousOnly, renderSignupPage);
userRouter.post("/sign-up", anonymousOnly, createUser);
userRouter.get("/sign-in", anonymousOnly, renderSigninPage);
userRouter.post("/sign-in", anonymousOnly, signinUser);
userRouter.get("/sign-out", authorizedOnly, signOutUser);
userRouter.get('/edit-profile', authorizedOnly, renderEditProfilePage);
userRouter.get("/profile/:id", renderProfilePage);
userRouter.post('/update', authorizedOnly, updateUser);


// route handlers

function renderSignupPage(req: Request, res: Response) {
    return res.render("user/sign-up");
}


async function createUser(req: Request, res: Response) {

    const result = validate<SignUpInfo>(req);

    if (!result.success) {
        req.setFlashErrors(result.errors[0].message);
        return res.redirect('back');
    }

    const response = await userRepo.createUser(result.data);

    if (!response.success) {
        req.setFlashErrors(response.errors[0].message);
        return res.redirect('back');
    }

    return res.redirect("/users/sign-in");

}



function renderSigninPage(req: Request, res: Response) {
    return res.render("user/sign-in")
}



function signinUser(req: Request, res: Response, next: NextFunction) {

    function authCallback(err: any, user: any, info: any) {

        if (err) return next(err);

        if (!user) {
            req.setFlashErrors(info.message);
            return res.redirect('back');
        }

        function loginCallback(error: any) {
            if (error) return next(error);
            req.setFlashMessage('Signed in successfully');
            return res.redirect('/');
        }

        req.login(user, loginCallback);

    }

    const handler = passport.authenticate('local', authCallback);

    handler(req, res, next);

}



function signOutUser(req: Request, res: Response) {
    return req.logout(() => {
        req.setFlashMessage('Signed out successfully');
        return res.redirect('/');
    });
}



function renderEditProfilePage(req: Request, res: Response) {
    return res.render('user/edit');
}


async function renderProfilePage(req: Request, res: Response) {

    const userId = req.params.id;
    const result = await userRepo.getUser(userId);

    if (!result.success) {
        return res.render('user/profile', {
            errorMessage: result.errors[0].message
        });


    }

    return res.render('user/profile', { userInfo: result.data });

}



async function updateUser(req: Request, res: Response) {

    const result = validate<ProfileUpdateInfo>(req);

    if (!result.success) {
        req.setFlashErrors(result.errors[0].message);
        return res.redirect('back');
    }

    const user = req.user as UserDto;

    const response = await userRepo.updateUser(user, result.data);

    if (!response.success) {
        req.setFlashErrors(response.errors[0].message);
        return res.redirect('back');
    }


    return res.redirect('/');

}



export { router };
