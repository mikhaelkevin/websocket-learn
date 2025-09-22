const path = require("path");

const ccFormAdd = async (req, res) => {
  const data = req?.body;

  req.io.emit("formSubmitted", data);

  const response = {
    message: "Form is submitted!",
    data
  };

  res.status(200).send(response);
};

const isCallingUs = async (req, res) => {
  const sockets = await req.io.fetchSockets();
  const availableSocket = sockets.find(s => s.data.available);

  if (availableSocket) {
    availableSocket.emit("incomingCall", { message: "Someone is calling us!" });
    availableSocket.data.available = false;
    res.status(200).send(`Sent call to client ${availableSocket.id}`);
  } else {
    res.status(200).send("No available clients right now");
  }
};

module.exports = { ccFormAdd, isCallingUs};
