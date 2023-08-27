import workerpool from "workerpool";
import { getPath, renderMailTemplate } from "@helpers";
import { CommentDto } from "types/dto";

const pool = workerpool.pool(getPath('dist/helpers/sendmail.js'));

export async function sendCommentMail(comment: CommentDto) {
    const html = await renderMailTemplate('comment-added', { comment });
    pool.exec('sendMail', [comment.post?.user?.email, "New comment added", html]);
} 