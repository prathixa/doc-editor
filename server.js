const http = require('http');
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

const temporaryDocs = {}; 

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // 1. Join a document room
  socket.on("get-document", (documentId) => {
    socket.join(documentId);
    socket.emit("load-document", temporaryDocs[documentId] || "");

    // 2. Listen for changes from this user
    socket.on("send-changes", (delta) => {
      // 3. Send to everyone ELSE in this room
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // 4. Update memory
    socket.on("save-document", (data) => {
      temporaryDocs[documentId] = data;
    });
  });
});

server.listen(3005, "127.0.0.1", () => {
    console.log("🚀 Server running on http://127.0.0.1:3005");
});