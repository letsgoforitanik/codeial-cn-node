import * as api from "api";
import { showError, showMessage } from "lib";
import { createPostElement } from "elements";

const btnCreatePost = document.getElementById('btn-create-post')!;
const formCreatePost = document.getElementById('form-create-post')!;
const txtCreatePost = document.getElementById('txt-create-post')!;
const linksDeletePost = document.querySelectorAll('.link-delete-post')!;
const ulPosts = document.getElementById('posts')!;


// event handlers 

$(btnCreatePost).on('click', handleCreatePost);
$(linksDeletePost).on('click', handleDeletePost);

async function handleCreatePost(event: Event) {

    event.preventDefault();

    const data = $(formCreatePost).serialize();

    const response = await api.createPost(data);

    if (!response.success) {
        showError(response.errors[0].message);
        return;
    }

    const post = response.data;

    const $element = createPostElement(post);

    $element.appendTo(ulPosts);
    $element.find('.link-delete-post').on('click', handleDeletePost);

    $(txtCreatePost).val('');

    showMessage('Post created successfully');

}

async function handleDeletePost(this: HTMLAnchorElement, event: Event) {

    event.preventDefault();

    const response = await api.deletePost(this.href);

    if (!response.success) {
        showError(response.errors[0].message);
        return;
    }

    $(this).closest('li').remove();

    showMessage('Post deleted successfully');

}