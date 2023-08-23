import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepo } from "@repositories";
import { authenticateJwt } from "@middlewares";

const router = express.Router();
const userRouter = express.Router();

// routes

router.use("/users", userRouter)

userRouter.post("/sign-in", signIn);
userRouter.get("/:id", authenticateJwt(), getUserDetails);

// route handlers

async function signIn(req: Request, res: Response) {

    const { email, password } = req.body;
    const response = await userRepo.findUserByEmail(email);

    if (!response.success) return res.notFound('User not found');
    const user = response.data;

    if (user.password !== password) return res.badRequest('Wrong password');
    const token = jwt.sign(user, 'aniruddha-banerjee', { expiresIn: '1m' });

    return res.success({ token });
}


async function getUserDetails(req: Request, res: Response) {

    const userId = req.params.id;

    const response = await userRepo.getUser(userId);

    if (!response.success) return res.notFound('User not found');

    const user = response.data;

    return res.success(user);
}


export { router }