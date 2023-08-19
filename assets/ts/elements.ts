import { Post } from "types";

export function createPostElement(post: Post) {
    const htmlString = `<li>
                            <div><b>${post.content}</b></div>
                            <small></small>
                            <a href="/posts/delete/${post.id}" class="link-delete-post">Delete</a>  
                            <br><br>
                            <div><b>Comments</b></div>
                            <ul></ul>

                            <form action="/comments/create" method="post">
                                <input type="hidden" value="${post.id}" name="postId">
                                <input type="text" name="content" placeholder="Type here to comment...">
                                <button type="submit">Add Comment</button>
                            </form>
                        </li>`;

    return $(htmlString);
}