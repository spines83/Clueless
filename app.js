var express = require('express');
var app = express();

var Communication = require('./server/Communication');
var GameState = require('./server/GameState');

GameState.initMessaging();

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