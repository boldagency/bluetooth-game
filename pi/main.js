var bluetoothServer = new (require("bluetooth-serial-port").BluetoothSerialPortServer)();

var CHANNEL = 10; // My service channel. Defaults to 1 if omitted.
var UUID = "38e851bc-7144-44b4-9cd8-80549c6f2912"; // My own service UUID. Defaults to '1101' if omitted


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8081, () => {
  console.log('listening on *:8081');
});


// bluetooth
bluetoothServer.on("data", function (buffer) {
    console.log("Received data from client: " + buffer);

    // ...
    io.emit('story', { someProperty: 'value', otherProperty: 'value' }); // This will emit the event to all connected sockets



    console.log("Sending data to the client");
    bluetoothServer.write(Buffer.from("..."), function (err, bytesWritten) {
        if (err) {
            console.log("Error!");
        } else {
            console.log("Send " + bytesWritten + " to the client!");
        }
    });
});

bluetoothServer.listen(
    function (clientAddress) {
        console.log("Client: " + clientAddress + " connected!");
    },
    function (error) {
        console.error("Something wrong happened!:" + error);
    },
    //{ uuid: UUID, channel: CHANNEL }
);
