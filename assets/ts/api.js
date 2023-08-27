"use strict";
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
exports.deleteCommentFromPost = exports.addCommentToPost = exports.deletePost = exports.createPost = void 0;
const lib_1 = require("lib");
function createPost(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, lib_1.post)('/posts/create', data);
    });
}
exports.createPost = createPost;
function deletePost(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, lib_1.get)(url);
    });
}
exports.deletePost = deletePost;
function addCommentToPost(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, lib_1.post)('/comments/create', data);
    });
}
exports.addCommentToPost = addCommentToPost;
function deleteCommentFromPost(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, lib_1.get)(url);
    });
}
exports.deleteCommentFromPost = deleteCommentFromPost;
