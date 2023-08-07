import express from "express";
import { validate } from "@helpers";
import { userRepo } from "@repositories";
import { SignUpInfo } from "types/validation";

const router = express.Router();
const userRouter = express.Router();

router.use("/users", userRouter);

// render the sign-up page
userRouter.get("/sign-up", function (_, res) {
    return res.render("user/sign-up", {
        pageTitle: "Sign Up",
        data: null,
        errorMessage: null,
    });
});

// create user
userRouter.post("/sign-up", async function (req, res) {
    try {
        const result = validate<SignUpInfo>(req);

        if (!result.success) {
            return res.render("user/sign-up", {
                pageTitle: "Sign Up",
                errorMessage: result.errorMessage,
                data: req.body,
            });
        }

        const info = result.data;
        await userRepo.createUser(info);

        return res.redirect("/users/sign-in");
    } catch (error) {
        console.log("Error : ", error);
        return res.redirect("/internal-server-error");
    }
});

// render the sign-in page
userRouter.get("/sign-in", function (_, res) {
    return res.render("user/sign-in", {
        pageTitle: "Sign In",
    });
});

// create session on successful authentication
userRouter.post("/sign-in", function (req, res) {});

export { router };
