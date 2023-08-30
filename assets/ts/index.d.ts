import { io as lookup } from "./node_modules/socket.io-client/build/esm/index";

declare global {
    var io: typeof lookup;
}

