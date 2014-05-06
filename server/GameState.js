var Communication = require('./Communication.js');

exports.init = function(){
    Communication.onMessageFromClient('player.move', function(sessionId, message){
        Communication.sendMessageToClient('player.move', message);
    });
}