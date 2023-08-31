import * as api from "./api";
import { showError, showMessage } from "./lib";
import * as elements from "./elements";

const btnCreatePost = document.getElementById('btn-create-post')!;
const formCreatePost = document.getElementById('form-create-post')!;
const txtCreatePost = document.getElementById('txt-create-post')!;
const linksDeletePost = document.querySelectorAll('.link-delete-post')!;
const ulPosts = document.getElementById('posts')!;
const btnsAddComment = document.querySelectorAll('.btn-add-comment')!;
const linksDeleteComments = document.querySelectorAll('.link-delete-comment')!;

// event handlers 

$(btnCreatePost).on('click', handleCreatePost);
$(linksDeletePost).on('click', handleDeletePost);
$(btnsAddComment).on('click', handleAddComment);
$(linksDeleteComments).on('click', handleDeleteComment);

async function handleCreatePost(event: Event) {
    event.preventDefault();
    const data = $(formCreatePost).serialize();
    const response = await api.createPost(data);

    if (!response.success) {
        showError(response.errors[0].message);
        return;
    }

    const post = response.data;
    const $element = elements.getPostElement(post);

    $element.prependTo(ulPosts);
    $element.find('.link-delete-post').on('click', handleDeletePost);
    $element.find('button').on('click', handleAddComment);
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



async function handleAddComment(this: HTMLButtonElement, event: Event) {
    event.preventDefault();

    const data = $(this).closest('form').serialize();
    const response = await api.addCommentToPost(data);

    if (!response.success) {
        showError(response.errors[0].message);
        return;
    }

    const comment = response.data;

    const $element = elements.getCommentElement(comment);

    const $ulComments = $(this).closest('li').find('ul');
    const $txtComment = $(this).closest('form').find('input[type=text]');

    $element.prependTo($ulComments);
    $element.find('a.link-delete-comment').on('click', handleDeleteComment);
    $txtComment.val('');
    showMessage('Comment created successfully');
}




async function handleDeleteComment(this: HTMLAnchorElement, event: Event) {
    event.preventDefault();
    const response = await api.deleteCommentFromPost(this.href);

    if (!response.success) {
        showError(response.errors[0].message);
        return;
    }

    $(this).closest('li').remove();
    showMessage('Comment deleted successfully');

}