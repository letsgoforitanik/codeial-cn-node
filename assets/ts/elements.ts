import { Post, Comment } from "types";

export function getPostElement(post: Post) {
    return $(`<li>
                <div><b>${post.content}</b></div>
                <small>${post.user.name}</small>
                <a href="/posts/delete/${post.id}" class="link-delete-post">Delete</a>  
                <div class="comment-header">Comments</div>

                <form action="/comments/create" method="post">
                    <input type="hidden" value="${post.id}" name="postId">
                    <input type="text" name="content" placeholder="Type here to comment...">
                    <button type="submit">Add Comment</button>
                </form>
            </li>`);
}

export function getCommentElement(comment: Comment) {
    return $(`<li>
                <p>
                    <span><b>${comment.content}</b></span><br>
                    <small>${comment.user.name}</small>
                    <a href="/comments/delete/${comment.id}" class="link-delete-comment">Delete</a>
                </p>
            </li>`);
}