import { z } from 'zod';

const signinValidator = z.object({
    email: z.string().email(),
    password: z.string().nonempty()
});

export default signinValidator;