const ulChatMessageList = document.querySelector('#chat-messages-list')!;
const txtChatMessage = document.querySelector('#chat-message-input')!;
const txtUserEmail = document.querySelector('#chat-user-email')!;
const btnSendMessage = document.querySelector('#send-message')!;

const socket = io('ws://localhost:3000') as any;

socket.emit('join-room');

socket.on('send-message', receiveMessage);

$(btnSendMessage).on('click', sendMessage);

function sendMessage() {
    const message = $(txtChatMessage).val();
    const senderEmail = $(txtUserEmail).val();

    socket.emit('send-message', { message, senderEmail });

    const $messageElement = `<li class="self-message">
                                <span>${message}</span>
                                <div class="sender">from : ${senderEmail}</div>
                            </li>`;

    $(ulChatMessageList).append($messageElement);
    $(txtChatMessage).val('');
}

function receiveMessage({ message, senderEmail }: any) {

    const $messageElement = `<li class="other-message">
                                <span>${message}</span>
                                <div class="sender">from : ${senderEmail}</div>
                            </li>`;

    $(ulChatMessageList).append($messageElement);
}

