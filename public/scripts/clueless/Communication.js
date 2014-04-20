define([
    'jquery'
], function($){

    var ws,
        callbacks = [],
        sessionId;

    var exposed = {
        init: function(host, port){
            ws = new WebSocket('ws://' + host + ':' + port);
            ws.onmessage = function(message){
                if (!sessionId){
                    sessionId = message.data;
                    console.log(sessionId);
                    return;
                }
                callbacks.forEach(function(callback){
                    callback(message);
                });
            }
        },
        getSessionId: function(){
            return sessionId;
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