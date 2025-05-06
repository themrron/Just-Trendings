const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Utility function: generate dummy trending topics
function generateDummyTrends() {
  const trends = [];
  const topics = ['Music', 'Technology', 'Politics', 'Sports', 'Fashion', 'Movies', 'Gaming', 'Health'];

  // Generate 5 random trends
  for (let i = 0; i < 5; i++) {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    trends.push({
      title: `${randomTopic} Trend ${Math.floor(Math.random() * 100)}`,
      time: new Date().toLocaleTimeString()
    });
  }
  return trends;
}

// When a client connects, send updates every 5 seconds.
io.on('connection', (socket) => {
  console.log('A client connected');

  // Send update immediately and then every 5 seconds
  const sendUpdate = () => {
    const trendData = generateDummyTrends();
    socket.emit('trendUpdate', trendData);
  };

  sendUpdate();
  const intervalId = setInterval(sendUpdate, 5000);

  socket.on('disconnect', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

// Start the server on port 3000 or your preferred port.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
