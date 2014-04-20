define([
    'jquery'
], function($){

    var ws,
        callbacks = [];

    var exposed = {
        init: function(host, port){
            ws = new WebSocket('ws://' + host + ':' + port);
            ws.onmessage = function(message){
                callbacks.forEach(function(callback){
                    callback(message);
                });
            }
        },
        addMessageHandler: function(callback){
            callbacks.push(callback);
        },
        sendMessage: function(message){
            ws.send(message);
        }
    }

    return exposed;

});