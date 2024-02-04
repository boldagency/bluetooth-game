var bluetoothServer = new (require("bluetooth-serial-port").BluetoothSerialPortServer)();

var CHANNEL = 10; // My service channel. Defaults to 1 if omitted.
var UUID = "38e851bc-7144-44b4-9cd8-80549c6f2912"; // My own service UUID. Defaults to '1101' if omitted


// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const io = require('socket.io')(server, {
//     cors: {
//       origin: '*',
//     }
//   });


// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(8089, () => {
//   console.log('listening on *:8089');
// });


// bluetooth
bluetoothServer.on("data", function (buffer) {
    console.log("Received data from client: " + buffer);

    // ...
    // io.emit('story', { someProperty: 'value', otherProperty: 'value' }); // This will emit the event to all connected sockets
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ p1: true }),
        redirect: 'follow'
    };

    fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/set-players", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
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
