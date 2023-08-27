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
exports.showError = exports.showMessage = exports.get = exports.post = void 0;
function post(url, serializedData) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: serializedData
        };
        const response = yield fetch(url, options);
        return yield response.json();
    });
}
exports.post = post;
function get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        return yield response.json();
    });
}
exports.get = get;
function showMessage(message) {
    const noty = new Noty({
        theme: 'metroui',
        type: "success",
        text: message,
        timeout: 2000
    });
    noty.show();
}
exports.showMessage = showMessage;
function showError(errorMessage) {
    const noty = new Noty({
        theme: 'metroui',
        type: "error",
        text: errorMessage,
        timeout: 2000
    });
    noty.show();
}
exports.showError = showError;
