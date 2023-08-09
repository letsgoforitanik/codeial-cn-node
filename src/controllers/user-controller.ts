import express, { Request, Response } from "express";
import { validate } from "@helpers";
import { userRepo } from "@repositories";
import { SignInInfo, SignUpInfo } from "types/validation";


const router = express.Router();
const userRouter = express.Router();

router.use("/users", userRouter);


userRouter.get("/", testError);
async function testError(req: Request, res: Response) {

    const response = await userRepo.createUser({
        email: 'letsgofoitanik@gmail.com',
        name: 'Anik Banerjee',
        password: 'Hydrogen2'
    });

    return res.json(response);
}


userRouter.get("/sign-up", getSignUpView);
function getSignUpView(req: Request, res: Response) {

    return res.render("user/sign-up", {
        pageTitle: "Sign Up",
        errorMessage: null,
        data: null,
    });
}


userRouter.post("/sign-up", signupUser);
async function signupUser(req: Request, res: Response) {

    const result = validate<SignUpInfo>(req);

    if (!result.success) {
        return res.render("user/sign-up", {
            pageTitle: "Sign Up",
            errorMessage: result.errorMessage,
            data: req.body,
        });
    }

    const response = await userRepo.createUser(result.data);

    if (!response.success) {
        return res.render("user/sign-up", {
            pageTitle: "Sign Up",
            errorMessage: response.errorMessage,
            data: req.body,
        });
    }

    return res.redirect("/users/sign-in");
}




userRouter.get("/sign-in", getSignInView);
function getSignInView(req: Request, res: Response) {

    return res.render("user/sign-in", {
        pageTitle: "Sign In",
        errorMessage: null,
        data: null
    });
}


userRouter.post('/sign-in', signinUser);
async function signinUser(req: Request, res: Response) {

    const result = validate<SignInInfo>(req);

    if (!result.success) {
        return res.render('user/sign-in', {
            pageTitle: 'Sign In',
            errorMessage: result.errorMessage,
            data: req.body
        });
    }

    const { email, password } = result.data;

    const response = await userRepo.findUserByEmail(email);

    if (!response.success) {
        return res.render('user/sign-in', {
            pageTitle: 'Sign In',
            errorMessage: response.errorMessage,
            data: req.body
        });
    }

    const user = response.data;

    if (password !== user.password) {
        return res.render('user/sign-in', {
            pageTitle: 'Sign In',
            errorMessage: 'Wrong password entered',
            data: req.body
        });
    }

    // sign-in code 
    res.cookie('auth', user.id);

    return res.redirect('/users/profile');

}


userRouter.get('/profile', getProfileView);
async function getProfileView(req: Request, res: Response) {

    const userId = req.cookies['auth'];

    if (!userId) return res.redirect('/users/sign-in');

    const response = await userRepo.findUserById(userId);

    if (!response.success) return res.redirect('/users/sign-up');

    return res.render('user/profile', {
        pageTitle: 'Profile',
        userInfo: response.data
    });
}

userRouter.get('/sign-out', signoutUser);
function signoutUser(req: Request, res: Response) {
    res.clearCookie('auth');
    return res.redirect('/users/sign-in');
}

export { router };
