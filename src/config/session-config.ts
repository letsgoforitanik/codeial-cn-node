import { SessionOptions } from "express-session";

const sessionConfig: SessionOptions = {
    name: 'codial-cn',
    secret: 'roger-federer-20',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
};

export default sessionConfig;