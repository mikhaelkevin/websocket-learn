const WebSocket = require("ws");

const wsp = {port: 3001};
const wss = new WebSocket.Server(wsp);
console.log("WebSocket is running on ws://localhost:3001");

wss.on("connection", ws => {
    console.log("New Client connected");

    // Send message to connected client (plain string)
    ws.send("Connected to local websocket server!");

    // Handle incoming message from client
    ws.on("message", data => {
        // If the data is a Buffer, convert it to a string
        if (Buffer.isBuffer(data)) {
            console.log("Received data as Buffer, converting to string...");
            data = data.toString(); // Convert Buffer to string
        }

        console.log("Received from client:", data); // Now it should be a string

        // Send a response back to the client as a string
        ws.send(`Message received: ${data}`); // Send string back
    });

    // Handle client disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
