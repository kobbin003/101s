import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
/** express app is attached to the httpserver */
const httpServer = createServer(app);
app.get("/", (_, res) => {
    res.send("hello socket");
});
/**  Express itself is capable of handling HTTP requests and can function
 * as a web server, Socket.IO, which is used for WebSocket-based communication,
 * requires a raw HTTP server instance to work efficiently. */
/** socketio server  is attached to the httpserver */
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV == "production" ? "" : "*",
    },
});
io.on("connection", (socket) => {
    console.log("socket connection established", socket.id);
    // listening for event "myevent"
    socket.on("from-client-event", (arg, cb) => {
        console.log("arg", arg);
        cb("got it");
        // emiting event "hi"
        io.emit("from-server-event", `take back- ${arg}`);
    });
    /** join room */
    socket.on("join-room", (arg, cb) => {
        socket.join(arg);
        cb(arg);
        console.log(socket.rooms);
        // io.to(arg).emit(`new-message`, "to all users");
    });
    /** listen for send-message event */
    socket.on("send-message", ({ roomName, message }, cb) => {
        console.log(roomName, message);
        io.to(roomName).emit("new-message", message);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
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