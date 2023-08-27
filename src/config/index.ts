import { initializeDb } from "./initializedb";
import sessionConfig from "./session-config";
import passport from './passport-local-strategy';
import authConfig from "./auth-config";
import uploadUserAvatar from "./multer-config";
import mailTransporter from "./nodemailer-config";

import "./passport-jwt-strategy";
import "./passport-google-oauth-strategy";

export { initializeDb, sessionConfig, passport, authConfig, uploadUserAvatar, mailTransporter };
