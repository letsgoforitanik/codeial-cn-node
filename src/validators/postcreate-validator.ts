import { z } from 'zod';

const postCreateValidator = z.object({
    content: z.string().nonempty("Post content can't be empty").trim()
});

export default postCreateValidator;