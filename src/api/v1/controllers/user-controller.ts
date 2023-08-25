import express, { Request, Response } from "express";
import { userRepo } from "@repositories";
import authService from "config/auth";


const router = express.Router();
const userRouter = express.Router();

// routes

router.use("/users", userRouter)

userRouter.post("/sign-in", signIn);
userRouter.get("/:id", authorizedOnly, getUserDetails);

// route handlers

async function signIn(req: Request, res: Response) {

    authService.verify('jwt', req, res, function (info: string, token: any) {
        if (info) return res.badRequest(info);
        return res.status(200).json({ success: true, token });
    });

}


async function getUserDetails(req: Request, res: Response) {

    const userId = req.params.id;

    const response = await userRepo.getUser(userId);

    if (!response.success) return res.notFound('User not found');

    const user = response.data;

    return res.success(user);
}


function authorizedOnly(req: Request, res: Response, next: any) {
    if (!req.user) return res.unauthorized();
    next();
}

export { router }