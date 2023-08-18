import { z } from 'zod';

const profileUpdateValidator = z.object({
    name: z.string().min(6, "Name must be at least 6 characters long"),
    email: z.string().email("Not a valid email"),
});

export default profileUpdateValidator;