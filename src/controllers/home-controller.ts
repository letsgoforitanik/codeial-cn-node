import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
    const message = req.flash('message');
    return res.render('home/index', { message });
});

export { router };
