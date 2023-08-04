import http from "http";

import express from "express";
import bodyParser from "body-parser";
import ejsLayouts from "express-ejs-layouts";
import dotenv from "dotenv";

import { homeController } from "@controllers";
import { getAbsPath } from "@helpers";

function configurePipeline(app: express.Express) {
    app.use(ejsLayouts);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(homeController.router);
}

function configureSettings(app: express.Express) {
    app.set("view engine", "ejs");
    app.set("views", getAbsPath("views"));
    app.set("layout", getAbsPath("views/layout/main"));
}

async function main() {
    dotenv.config();

    const app = express();

    configurePipeline(app);
    configureSettings(app);

    const port = process.env.PORT;

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is up and running on port ${port}`));
}

main();
