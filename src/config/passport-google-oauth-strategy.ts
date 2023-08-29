import passport from "passport";
import { OAuth2Strategy as GoogleOAuthStrategy } from "passport-google-oauth";
import { Profile, VerifyFunction } from "passport-google-oauth";
import { userRepo } from "@repositories";

const options = {
    clientID: "417272592481-8f3gvncudrjurabf11q6179ufeofol6s.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/users/sign-in/google/callback"
};


async function verify(accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction) {

    const name = profile.displayName;
    const email = profile.emails![0].value;

    const response = await userRepo.findUserByEmail(email);

    if (response.success) {
        const user = response.data;
        return done(null, user);
    }

    const result = await userRepo.createUser({ name, email, password: 'xxx123yyyyy', friends: [] });

    if (result.success) {
        const user = result.data;
        return done(null, user);
    }

    return done(null, false);

}


const googleStrategy = new GoogleOAuthStrategy(options, verify);

passport.use(googleStrategy);

