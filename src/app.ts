import http from "http";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import dotenv from "dotenv";

import { homeController, userController, postController } from "@controllers";
import { getAbsPath } from "@helpers";
import { initializeDb } from "@config";

function configurePipeline(app: express.Express) {
    app.use(ejsLayouts);
    app.use(express.static("assets"));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(homeController.router);
    app.use(userController.router);
    app.use(postController.router);
}

function configureAppSettings(app: express.Express) {
    app.set("view engine", "ejs");
    app.set("views", getAbsPath("views"));
    app.set("layout", getAbsPath("views/layout/main"));
}

async function main() {
    dotenv.config();

    const app = express();

    configureAppSettings(app);
    configurePipeline(app);

    await initializeDb();
    console.log("Database connection successfully made");

    const port = process.env.PORT;

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is up and running on port ${port}`));
}

main();
