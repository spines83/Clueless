var express = require('express');
var app = express();

// Basic web-server for static content in the public folder.
// http://localhost:3000/<filename> will look for the file in
// Clueless/public/<filename> and serve it up. If nothing is provided
// it defaults to index.html
app.use('/', express.static(__dirname + '/public'));

// Shows how to do a basic web service endpoint. If you type
// http://localhost:3000/hello in the browser, it will respond with
// the below message
app.get('/hello', function(req, res){
    res.send("Hello World Response!");
});

// Starting up the web server.
app.listen(3000, function(){
    console.log('Server started');
});

// Creating the web socket server
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 4000});

// When the web socket server is online
wss.on('connection', function(ws){

    // When the web socket server receives a message
    ws.on('message', function(message){

        // Log to the console
        console.log('received: %s', message);

        // And rebroadcast to anyone listening
        wss.broadcast(message);
    });
});

// Broadcast function taken from the wss documentation
wss.broadcast = function(data){
    for (var i in this.clients){
        this.clients[i].send(data);
    }
};