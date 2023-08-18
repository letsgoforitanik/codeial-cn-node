import { z } from 'zod';

const commentCreateValidator = z.object({
    content: z.string().nonempty("Empty comment can not be added").trim(),
    postId: z.string().nonempty()
});

export default commentCreateValidator;