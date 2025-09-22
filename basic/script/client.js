const socket = new WebSocket('ws://localhost:3001');

// Handle WebSocket open event (when the connection is established)
socket.addEventListener('open', event => {
    console.log('Connected to WebSocket server');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Connected to WebSocket server';
    document.getElementById('messages').appendChild(messageDiv);
});

// Handle WebSocket message event (when a message is received from the server)
socket.addEventListener('message', event => {
    const data = event.data; // No need to JSON.parse if it's a string

    // Log and display the message
    console.log(data);
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `Server: ${data}`;
    document.getElementById('messages').appendChild(messageDiv);
});

// Handle WebSocket close event (when the connection is closed)
socket.addEventListener('close', event => {
    console.log('Disconnected from WebSocket server');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Disconnected from WebSocket server';
    document.getElementById('messages').appendChild(messageDiv);    
});

// Send a message to the WebSocket server
document.getElementById('sendMessage').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;

  if (message) {
    socket.send(message); // Send the message to the WebSocket server
    document.getElementById('messageInput').value = ''; // Clear input field

    // Display the message you sent
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `You: ${message}`;
    document.getElementById('messages').appendChild(messageDiv);
  }
});
