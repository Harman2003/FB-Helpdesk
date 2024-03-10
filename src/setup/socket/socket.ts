import { io } from "socket.io-client";

const URL = "https://fb-helpdesk-server-dev-hajj.1.us-1.fl0.io";
export const socket = io(URL, {
    autoConnect: false,
});
