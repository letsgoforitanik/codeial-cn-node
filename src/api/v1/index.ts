import express from "express";
import { postController, userController } from "./controllers";
import authService from "config/auth";

const v1Router = express.Router();

v1Router.use(authService.authenticate("jwt"));
v1Router.use(userController.router);
v1Router.use(postController.router);

export default v1Router;