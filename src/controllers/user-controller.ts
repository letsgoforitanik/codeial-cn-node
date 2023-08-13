import express from "express";
import { validate } from "@helpers";
import { userRepo } from "@repositories";
import { passport } from '@config';
import { SignUpInfo } from "types/validation";
import { anonymousOnly, authorizedOnly } from "@middlewares";


const router = express.Router();
const userRouter = express.Router();

router.use("/users", userRouter);


// render the sign-up page
userRouter.get("/sign-up", anonymousOnly, (req, res) => res.render("user/sign-up"));


// create user
userRouter.post("/sign-up", anonymousOnly, async function (req, res) {

    const result = validate<SignUpInfo>(req);

    if (!result.success) {
        return res.render("user/sign-up", {
            errorMessage: result.errors[0].message,
            data: req.body,
        });
    }

    const response = await userRepo.createUser(result.data);

    if (!response.success) {
        return res.render("user/sign-up", {
            errorMessage: response.errors[0].message,
            data: req.body,
        });
    }

    return res.redirect("/users/sign-in");

});



// render the sign-in page
userRouter.get("/sign-in", anonymousOnly, (req, res) => res.render("user/sign-in"));


// create session on successful authentication
userRouter.post("/sign-in", anonymousOnly, function (req, res, next) {

    function authCallback(err: any, user: any, info: any) {

        if (err) return next(err);

        if (!user) {
            return res.render('user/sign-in', {
                errorMessage: info.message,
                data: req.body
            });
        }

        function loginCallback(error: any) {
            if (error) return next(error);
            res.redirect('/users/profile');
        }

        req.login(user, loginCallback);

    }

    const handler = passport.authenticate('local', authCallback);

    handler(req, res, next);

});


// profile page
userRouter.get("/profile", authorizedOnly, function (req, res) {
    return res.render('user/profile');
});


// sign out
userRouter.get("/sign-out", authorizedOnly, function (req, res) {
    req.logout(() => res.redirect('/users/profile'));
});




export { router };
