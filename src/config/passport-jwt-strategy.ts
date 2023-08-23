import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { userRepo } from "@repositories";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'aniruddha-banerjee'
};

async function verify(payload: any, done: VerifiedCallback) {
    const response = await userRepo.findUserById(payload.id);
    if (!response.success) return done(null, false);
    const user = response.data;
    return done(null, user);
}


const jwtStrategy = new JwtStrategy(options, verify);

passport.use(jwtStrategy);
