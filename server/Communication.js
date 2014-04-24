// Creating the web socket server
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 4000});
var uuid = require('node-uuid');

var idToSocket = {};
var subscribers = {}

wss.broadcast = function(data){
    for (var i in this.clients){
        this.clients[i].send(data);
    }
};

// When the web socket server is online
wss.on('connection', function(ws){

    // implement a session identifier
//    var id = uuid.v4();
//
//    idToSocket[id] = ws;
//    exports.sendMessageToUser(id, id);

    // When the web socket server receives a message
    ws.on('message', function(message){

        message = JSON.parse(message);
        console.log(message);
//        // Look for subscribers on on that channel and publish out to them
//        console.log(subscribers);
        var callbacks = subscribers[message.channel] || [];
        callbacks.forEach(function(callback){
            callback(message.message);
        });
    });
});

exports.onMessageFromClient = function(channel, callback){
    if (!subscribers[channel]){
        subscribers[channel] = [];
    }

    subscribers[channel].push(callback);
}

exports.sendMessageToClient = function(channel, message){
    console.log('publish to ' + channel);
    console.log(message);
    wss.broadcast(JSON.stringify({
        channel: channel,
        message: message
    }));
}