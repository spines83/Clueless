define([
    'jquery'
], function($){

    var ws,
        subscribers = {},
        sessionId = Math.floor(Math.random() * (100000000)); // Normally would use a UUID

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

            waitForSocketConnection(ws, function(){
                exposed.sendMessageToServer('__register__', "");
            });

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

    function waitForSocketConnection(socket, callback){
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if(callback != null){
                        callback();
                    }
                    return;

                } else {
                    console.log("wait for connection...")
                    waitForSocketConnection(socket, callback);
                }

            }, 5); // wait 5 milisecond for the connection...
    }

    return exposed;

});