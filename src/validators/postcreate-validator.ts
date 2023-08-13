import { z } from 'zod';

const postCreateValidator = z.object({
    content: z.string().nonempty('Enter content').trim()
});

export default postCreateValidator;