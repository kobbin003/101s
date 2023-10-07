import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
/** express app is attached to the httpserver */
const httpServer = createServer(app);
/** socketio server  is attached to the httpserver */
app.get("/", (_, res) => {
    res.send("hello socket");
});
/**  Express itself is capable of handling HTTP requests and can function
 * as a web server, Socket.IO, which is used for WebSocket-based communication,
 * requires a raw HTTP server instance to work efficiently. */
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV == "production" ? "" : "http://localhost:5173",
    },
});
io.on("connection", (socket) => {
    console.log("socket connection established", socket.id);
});
/** in this server we have:
 * 1. express: to handle HTTP requests.
 * 2. socketio: to handle websocket connections.
 * *recommended for separation of concerns.
 */
httpServer.listen(3000, () => {
    console.log("server listening on port 3000");
});
//# sourceMappingURL=index.js.map