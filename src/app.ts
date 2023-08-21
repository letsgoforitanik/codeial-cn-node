import "load-environment";

import http from "http";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import ejsLayouts from "express-ejs-layouts";

import { homeController, userController } from "@controllers";
import { postController, errorController } from "@controllers";
import { commentController } from "@controllers";
import { errorHandler, viewBag, locals } from '@middlewares';
import { getAbsPath, trycatchify, extendExpress } from "@helpers";
import { initializeDb, passport, sessionConfig } from "@config";


function configurePipeline(app: express.Express) {
    // middlewares ===========
    app.use(ejsLayouts);
    app.use(express.static("assets"));
    app.use('/uploads', express.static("uploads"));
    app.use(viewBag);
    app.use(cookieParser());
    app.use(session(sessionConfig));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(locals);
    app.use(bodyParser.urlencoded({ extended: false }));
    // routers ===========
    app.use(homeController.router);
    app.use(userController.router);
    app.use(postController.router);
    app.use(commentController.router);
    app.use(errorController.router);
    // global error handler =====
    app.use(errorHandler);
}

function configureAppSettings(app: express.Express) {
    app.set("view engine", "ejs");
    app.set("views", getAbsPath("views"));
    app.set("layout", getAbsPath("views/layout/main"));
}

async function main() {

    extendExpress();

    const app = express();

    configureAppSettings(app);
    configurePipeline(app);

    trycatchify(app);

    await initializeDb();
    console.log("Database connection successfully made");

    const port = process.env.PORT;

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is up and running on port ${port}`));

}

main();
