import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export default function listenForSockets(server: HttpServer) {
    const io = new Server(server);
    console.log(`Server configured to listen for sockets`);
    io.on('connection', onEstablishingConnecton);
}


function onEstablishingConnecton(socket: Socket) {

    socket.on('join-room', function () {
        socket.join('chat-room');
    });

    socket.on('send-message', function ({ message, senderEmail }) {
        console.log(message);
        socket.to('chat-room').emit('send-message', { message, senderEmail });
    });

}