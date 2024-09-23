// server.js

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const PORT = 3001; // You can change this port if needed

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store live users in a Set to prevent duplicates
const liveUsers = [];

/**
 * Broadcasts a message to all connected clients.
 * @param {Object} data - The data to send.
 */
function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

/**
 * Handles new WebSocket connections.
 */
wss.on("connection", (ws) => {
  console.log("New client connected.");

  /**
   * Handles incoming messages from clients.
   * @param {string} message - The received message.
   */
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case "join":
          handleJoin(ws, data);
          break;
        case "message":
          handleMessage(ws, data);
          break;
        default:
          console.warn("Unknown message type:", data.type);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  /**
   * Handles client disconnection.
   */
  ws.on("close", () => {
    if (ws.username) {
      const userIndex = liveUsers.findIndex(
        (user) => user.name === ws.username
      );
      if (userIndex !== -1) {
        const user = liveUsers[userIndex];
        liveUsers.splice(userIndex, 1);

        console.log(`${user.name} has disconnected.`);
        broadcast({
          type: "leave",
          user: user.name,
          users: liveUsers,
          text: `${user.name} has left the chat.`,
        });
      }
    } else {
      console.log("A client disconnected before joining.");
    }
  });

  /**
   * Handles errors on the WebSocket connection.
   */
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

/**
 * Handles 'join' messages from clients.
 * @param {WebSocket} ws - The WebSocket connection.
 * @param {Object} data - The received data.
 */
function handleJoin(ws, data) {
  const { name, location, age } = data;

  if (!name || !location || !age) {
    ws.send(
      JSON.stringify({
        type: "error",
        message: "Username, location and age are required to join.",
      })
    );
    return;
  }

  ws.username = name;
  const newUser = { name, location, age };
  liveUsers.push(newUser);

  console.log(`${name} (${age}) has joined from ${location}.`);

  // Broadcast the join event to all clients
  broadcast({
    type: "join",
    user: name,
    location: location,
    age: age,
    users: Array.from(liveUsers),
    text: `${name} ${age} has joined the chat.`,
  });
}

/**
 * Handles 'message' messages from clients.
 * @param {WebSocket} ws - The WebSocket connection.
 * @param {Object} data - The received data.
 */
function handleMessage(ws, data) {
  const { text } = data;

  if (!ws.username) {
    ws.send(
      JSON.stringify({
        type: "error",
        message: "You must join the chat before sending messages.",
      })
    );
    return;
  }

  if (!text || text.trim() === "") {
    ws.send(
      JSON.stringify({
        type: "error",
        message: "Message text cannot be empty.",
      })
    );
    return;
  }

  const chatMessage = {
    type: "message",
    user: ws.username,
    location: data.location || "",
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };

  console.log(`Message from ${ws.username}: ${chatMessage.text}`);

  // Broadcast the chat message to all clients
  broadcast(chatMessage);
}

/**
 * Starts the server.
 */
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});

/**
 * Optional: Serve a simple welcome message on HTTP requests.
 */
app.get("/", (req, res) => {
  res.send("WebSocket Chat Server is running.");
});
