import { Socket, io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
// 	import.meta.env.MODE === "production" ? "undefined" : "http://localhost:3000";
const URL = "http://localhost:3000";
export const socket: Socket = io(URL, { autoConnect: false });
