"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __importStar(require("api"));
const lib_1 = require("lib");
const elements = __importStar(require("elements"));
const btnCreatePost = document.getElementById('btn-create-post');
const formCreatePost = document.getElementById('form-create-post');
const txtCreatePost = document.getElementById('txt-create-post');
const linksDeletePost = document.querySelectorAll('.link-delete-post');
const ulPosts = document.getElementById('posts');
const btnsAddComment = document.querySelectorAll('.btn-add-comment');
const linksDeleteComments = document.querySelectorAll('.link-delete-comment');
// event handlers 
$(btnCreatePost).on('click', handleCreatePost);
$(linksDeletePost).on('click', handleDeletePost);
$(btnsAddComment).on('click', handleAddComment);
$(linksDeleteComments).on('click', handleDeleteComment);
function handleCreatePost(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const data = $(formCreatePost).serialize();
        const response = yield api.createPost(data);
        if (!response.success) {
            (0, lib_1.showError)(response.errors[0].message);
            return;
        }
        const post = response.data;
        const $element = elements.getPostElement(post);
        $element.prependTo(ulPosts);
        $element.find('.link-delete-post').on('click', handleDeletePost);
        $element.find('button').on('click', handleAddComment);
        $(txtCreatePost).val('');
        (0, lib_1.showMessage)('Post created successfully');
    });
}
function handleDeletePost(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const response = yield api.deletePost(this.href);
        if (!response.success) {
            (0, lib_1.showError)(response.errors[0].message);
            return;
        }
        $(this).closest('li').remove();
        (0, lib_1.showMessage)('Post deleted successfully');
    });
}
function handleAddComment(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const data = $(this).closest('form').serialize();
        const response = yield api.addCommentToPost(data);
        if (!response.success) {
            (0, lib_1.showError)(response.errors[0].message);
            return;
        }
        const comment = response.data;
        const $element = elements.getCommentElement(comment);
        const $ulComments = $(this).closest('li').find('ul');
        const $txtComment = $(this).closest('form').find('input[type=text]');
        $element.prependTo($ulComments);
        $element.find('a.link-delete-comment').on('click', handleDeleteComment);
        $txtComment.val('');
        (0, lib_1.showMessage)('Comment created successfully');
    });
}
function handleDeleteComment(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const response = yield api.deleteCommentFromPost(this.href);
        if (!response.success) {
            (0, lib_1.showError)(response.errors[0].message);
            return;
        }
        $(this).closest('li').remove();
        (0, lib_1.showMessage)('Comment deleted successfully');
    });
}
