import passport from "passport";

export default function authenticateJwt() {
    return passport.authenticate('jwt', { session: false });
}

