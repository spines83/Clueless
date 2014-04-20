// Creating the web socket server
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 4000});
var uuid = require('node-uuid');

var idToSocket = {};

// When the web socket server is online
wss.on('connection', function(ws){

    // implement a session identifier
    var id = uuid.v4();

    idToSocket[id] = ws;
    exports.sendMessageToUser(id, id);

    // When the web socket server receives a message
    ws.on('message', function(message){

        // Log to the console
        console.log('received: %s', message);

        // And rebroadcast to anyone listening
        wss.broadcast(message);
    });
});


exports.broadcast = function(message){
// Broadcast function taken from the wss documentation
    wss.broadcast = function(data){
        for (var i in this.clients){
            this.clients[i].send(data);
        }
    };
}

exports.sendMessageToUser = function(id, message){
    if (!idToSocket[id]){
        return "Invalid ID";
    }

    idToSocket[id].send(message);
}