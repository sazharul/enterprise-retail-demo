import express from 'express';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {origin: "*"}
});


const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'chat.html'));
});

io.on('connection', async (socket) => {
    socket.on('chat message', async (msg, clientOffset, callback) => {
        io.emit('chat message', msg);
        console.log(msg);
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`server running at http://192.168.1.163:${port}`);
});

