const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static('public'));

// Логика чата
io.on('connection', (socket) => {
    console.log('Пользователь подключен');

    socket.on('message', (data) => {
        // Рассылаем сообщение всем, включая тип (text, voice, video_circle)
        io.emit('message', {
            userId: socket.id,
            content: data.content,
            type: data.type, // 'text' | 'voice' | 'video'
            timestamp: new Date().toLocaleTimeString()
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
