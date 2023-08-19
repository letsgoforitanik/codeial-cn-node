import * as api from "api";
import { showError, showMessage } from "lib";
import { createPostElement } from "elements";

const btnCreatePost = document.getElementById('btn-create-post')!;
const formCreatePost = document.getElementById('form-create-post')!;
const txtCreatePost = document.getElementById('txt-create-post')!;
const ulPosts = document.getElementById('posts')!;

// event handlers 
$(btnCreatePost).on('click', handleCreatePost);


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

    $(ulPosts).append($element);

    $(txtCreatePost).val('');

    showMessage('Post created successfully');

}