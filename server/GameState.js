var Communication = require('./Communication.js');

var playerIds = [];

exports.init = function(playerIdArray){

    playerIds = playerIdArray;

    var deck = require('./Cards').newDeck()
    deck.init();

    var card, i = 0;
    while ((card = deck.getCard()) != null){
        console.log(playerIdArray[i % playerIdArray.length] + " " + card);
        i = i + 1;
    }
    console.log('done!');

    Communication.onMessageFromClient('player.move', function(sessionId, message){
        Communication.sendMessageToClient('player.move', message);
    });
}