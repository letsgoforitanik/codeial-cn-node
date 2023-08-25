import express, { Request, Response, NextFunction } from "express";
import { userRepo } from "@repositories";
import { passport, uploadUserAvatar } from '@config';
import { ProfileUpdateInfo, SignUpInfo } from "types/validation";
import { anonymousOnly, authorizedOnly, validate } from "@middlewares";
import { deleteUserAvatar, validate as validateData } from '@helpers';
import { UserDto, UserUpdateDto } from "types/dto";


const router = express.Router();
const userRouter = express.Router();

const startGoogleSignIn = () => passport.authenticate('google', { scope: ['profile', 'email'] });
const finishGoogleSignIn = () => passport.authenticate('google', { failureRedirect: '/google-signin-error', successRedirect: '/' });

// routes

router.use("/users", userRouter);

userRouter.get("/sign-up", anonymousOnly, renderSignupPage);
userRouter.post("/sign-up", anonymousOnly, validate, createUser);
userRouter.get("/sign-in", anonymousOnly, renderSigninPage);
userRouter.post("/sign-in", anonymousOnly, signinUser);
userRouter.get("/sign-in/google", anonymousOnly, startGoogleSignIn());
userRouter.get("/sign-in/google/callback", finishGoogleSignIn());
userRouter.get("/sign-out", authorizedOnly, signOutUser);
userRouter.get('/edit-profile', authorizedOnly, renderEditProfilePage);
userRouter.get("/profile/:id", renderProfilePage);
userRouter.post('/update', authorizedOnly, updateUser);


// route handlers

function renderSignupPage(req: Request, res: Response) {
    return res.render("user/sign-up");
}


async function createUser(req: Request, res: Response) {

    const info = req.validationResult as SignUpInfo;

    const response = await userRepo.createUser(info);

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



async function updateUser(req: Request, res: Response, next: NextFunction) {

    const parseMultipart = uploadUserAvatar.single('avatar');

    parseMultipart(req, res, async function (error) {

        if (error instanceof Error) {
            if (error.message === 'File too large') req.setFlashErrors('Maximum file size is 1 mb');
            else if (error.message === 'Invalid image file') req.setFlashErrors('Please upload proper image file');
            else next(error);

            return res.redirect('back');
        }

        const result = validateData<ProfileUpdateInfo>(req);

        if (!result.success) {
            if (req.file) deleteUserAvatar(req.file.filename);
            req.setFlashErrors(result.errors[0].message);
            return res.redirect('back');
        }

        const user = req.user as UserDto;
        const updateInfo: UserUpdateDto = result.data;


        if (req.file) {
            if (user.avatar) await deleteUserAvatar(user.avatar);
            updateInfo.avatar = req.file.filename;
        }

        const response = await userRepo.updateUser(user, updateInfo);

        if (!response.success) req.setFlashErrors(response.errors[0].message);
        else req.setFlashMessage('Profile updated successfully');

        return res.redirect('back');

    });

}


export { router };
