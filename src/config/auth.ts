import { JwtStrategy } from "auth-service/jwt-strategy";
import { AuthenticationService } from "../auth-service";
import { userRepo } from "@repositories";
import { validateSignIn } from "@helpers";

const jwtStrategy = new JwtStrategy({
    usernameField: 'email',
    passwordField: 'password',
    secret: 'codeial',
    expiresIn: '5m',
    verify: async function (email: string, password: string) {
        const result = validateSignIn(email, password);
        if (!result.success) return { payload: null, info: result.errors[0].message };
        const response = await userRepo.findUserByEmail(email);
        if (!response.success) return { payload: null, info: response.errors[0].message };
        const user = response.data;
        return { payload: user.id, info: null };
    },
    populateUser: async function (userId) {
        const user = userRepo.findUserById(userId);
        return user;
    }
});


const authService = new AuthenticationService();

authService.use(jwtStrategy);

export default authService;
