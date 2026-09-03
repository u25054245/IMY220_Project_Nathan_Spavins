const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("validateLogIn", (data) => {
        console.log("Logged in");
        
        io.emit("chatMessage", {
            username: data.username,
            password: data.username
        });
    });

    socket.on("validateSignUp", (data) => {
        console.log("Signed up");

        io.emit("chatMessage", {
            username: data.username,
            password: data.username
        });
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});