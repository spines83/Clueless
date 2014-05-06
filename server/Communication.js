// Creating the web socket server
var WebSocketServer = require('ws').Server;
var Lobby = require('./Lobby'); // This shouldn't be imported, use pub/sub instead
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

    // When the web socket server receives a message
    ws.on('message', function(message){

        message = JSON.parse(message);
        console.log(message);

        if (message.channel == "__register__"){
            idToSocket[message.sessionId] = this.ws;
            this.ws._uuid = message.sessionId;
        }

        var callbacks = subscribers[message.channel] || [];
        callbacks.forEach(function(callback){
            callback(message.sessionId, message.message);
        });
    }.bind({ws: ws}));

    ws.on('close', function(){
        Lobby.handleDisconnectedUser(this.ws._uuid);
    }.bind({ws: ws}));
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