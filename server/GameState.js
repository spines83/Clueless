var Communication = require('./Communication.js');

exports.initMessaging = function(){
    Communication.onMessageFromClient('player.move', function(message){
        Communication.sendMessageToClient('player.move', message);
    });
}