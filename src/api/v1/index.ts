import express from "express";
import { postController, userController } from "./controllers";

const v1Router = express.Router();

v1Router.use(userController.router);
v1Router.use(postController.router);

export default v1Router;