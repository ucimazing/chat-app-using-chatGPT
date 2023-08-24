const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static(__dirname + "/public"));
const wordToEmoji = {
    "happy": "😊",
    "sad": "😢",
    "love": "❤️",
    "laugh": "😂",
    "angry": "😠",
    "react": "⚛️"
    // ... Add as many mappings as you like
};
function replaceWordsWithEmojis(message) {
    for (let word in wordToEmoji) {
        // Use a global regex to replace all occurrences of the word
        const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Use \b to mark word boundaries
        message = message.replace(regex, wordToEmoji[word]);
    }
    return message;
}


// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        const processedMessage = replaceWordsWithEmojis(msg);
        io.emit('chat message', processedMessage);
    });    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

