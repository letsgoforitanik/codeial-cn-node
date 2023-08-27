"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentElement = exports.getPostElement = void 0;
function getPostElement(post) {
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
exports.getPostElement = getPostElement;
function getCommentElement(comment) {
    return $(`<li>
                <p>
                    <span><b>${comment.content}</b></span><br>
                    <small>${comment.user.name}</small>
                    <a href="/comments/delete/${comment.id}" class="link-delete-comment">Delete</a>
                </p>
            </li>`);
}
exports.getCommentElement = getCommentElement;
