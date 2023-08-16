import { z } from 'zod';

const commentCreateValidator = z.object({
    content: z.string().nonempty('Enter content').trim(),
    postId: z.string().nonempty()
});

export default commentCreateValidator;