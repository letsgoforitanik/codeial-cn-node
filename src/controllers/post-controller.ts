import express from "express";

const router = express.Router();
const postRouter = express.Router();

router.use("/posts", postRouter);

postRouter.get("/", function (req, res) {
    res.send("Hello from posts");
});

export { router };
