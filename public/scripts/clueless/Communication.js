define([
    'jquery'
], function($){

    var ws,
        subscribers = {},
        sessionId;

    var exposed = {
        init: function(host, port){
            ws = new WebSocket('ws://' + host + ':' + port);
            ws.onmessage = function(message){

                var data = JSON.parse(message.data);

                var channel = data.channel;

                var callbacks = subscribers[channel] || [];

                callbacks.forEach(function(callback){
                    callback(data.message);
                });
            }
        },
        getSessionId: function(){
            return sessionId;
        },
        onMessageFromServer: function(channel, callback){
            if (!subscribers[channel]){
                subscribers[channel] = [];
            }
            subscribers[channel].push(callback);
        },
        sendMessageToServer: function(channel, message){
            ws.send(JSON.stringify({
                sessionId: sessionId,
                channel: channel,
                message: message
            }));
        }
    }

    return exposed;

});