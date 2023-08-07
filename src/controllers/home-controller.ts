import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
    return res.render("home/index", {
        pageTitle: "Home",
    });
});

export { router };
