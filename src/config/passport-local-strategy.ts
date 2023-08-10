import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { userRepo } from '@repositories';
import { validateSignIn } from '@helpers';

type DoneFunction = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;

const options = { usernameField: 'email', passwordField: 'password' };

async function verify(email: string, password: string, done: DoneFunction) {

    const response = validateSignIn(email, password);
    if (!response.success) return done(null, false, { message: response.errors[0].message });

    const result = await userRepo.findUserByEmail(response.data.email);
    if (!result.success) return done(null, false, { message: 'User not found' });

    const user = result.data;

    if (user.password !== password) return done(null, false, { message: 'Wrong password entered' });

    return done(null, user);

}

const localStrategy = new LocalStrategy(options, verify);

passport.use(localStrategy);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
    const result = await userRepo.findUserById(id);
    if (!result.success) return done(null, false);
    const user = result.data;
    return done(null, user);
});

export default passport;