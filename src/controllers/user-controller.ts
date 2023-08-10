import express from "express";
import { validate } from "@helpers";
import { userRepo } from "@repositories";
import { passport } from '@config';
import { SignUpInfo } from "types/validation";

const router = express.Router();
const userRouter = express.Router();

router.use("/users", userRouter);


// render the sign-up page
userRouter.get("/sign-up", (req, res) => res.render("user/sign-up"));


// create user
userRouter.post("/sign-up", async function (req, res) {

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
userRouter.get("/sign-in", (req, res) => res.render("user/sign-in"));


// create session on successful authentication
userRouter.post("/sign-in", function (req, res) {

    passport.authenticate('local', function (error: any, user: Express.User) {

        if (!user) {
            return res.render('user/sign-in', {
                data: req.body,
                errorMessage: 'Wrong username or password'
            });
        }

        return res.redirect('/users/profile');

    });

});

export { router };
