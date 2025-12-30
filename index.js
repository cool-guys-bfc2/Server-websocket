const { WebSocketServer } = require('ws');

// Render provides the port via an environment variable
const port = process.env.PORT || 10000;
const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  console.log('Player connected');

  ws.on('message', (data) => {
    // Broadcast received position/username to all other players
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => console.log('Player disconnected'));
});

console.log(`Server is listening on port ${port}`);
