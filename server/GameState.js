var Communication = require('./Communication.js');

var playerIds = [];

exports.init = function(playerIdArray){

    Communication.sendMessageToClient('panel.addMessage', {
        message: "Lobby full, starting a new game!"
    });

    playerIds = playerIdArray;

    var deck = require('./Cards').newDeck()
    deck.init();

    var card, i = 0;
    while ((card = deck.getCard()) != null){

        var sessionId = playerIdArray[i % playerIdArray.length];
        i = i + 1;

        // Used by Message Panel
        Communication.sendMessageToClientBySessionId(sessionId, 'panel.addMessage', {
            message: "You've been dealt: " + card
        });

        // Used by Detective Notes Panel
        Communication.sendMessageToClientBySessionId(sessionId, 'card.add', {
            card: card
        });
    }

    Communication.onMessageFromClient('player.move', function(sessionId, message){
        Communication.sendMessageToClient('player.move', message);
    });
    Communication.onMessageFromClient('panel.addMessage', function(sessionId, message){
        Communication.sendMessageToClient('panel.addMessage', message);
    });
}
