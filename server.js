const express = require('express');
const app = express();
const doenv = require('dotenv');
const cors = require('cors');
const dbconnect = require('./config/DBConnection');
const router = require('./Routes/routes');
const cookiePaser = require("cookie-parser")
const {Server} = require("socket.io");
const http = require("http");
doenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173',"http://192.168.1.2:5173"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
})
app.use(cors({
    origin:['http://localhost:5173',"http://192.168.1.2:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookiePaser());

dbconnect();

app.use("/users" , router );


// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT || 3000}`);
// })


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});server.listen(PORT, ()=>{
    console.log(`Socket.io server is running on port ${PORT || 3000}`);
})