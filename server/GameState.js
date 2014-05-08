var Communication = require('./Communication.js');
var _ = require('underscore');

var playerIds = [];
var playerToPiece = {};

var nameToDisplay = {
    green: "Mr. Green",
    peacock: "Mrs. Peacock",
    scarlet: "Ms. Scarlet",
    mustard: "Col. Mustard",
    plum: "Prof. Plum",
    white: "Mrs. White"
}

var cardsDealt = false;

exports.init = function(playerIdArray){

    playerIds = playerIdArray;

    Communication.sendMessageToClient('panel.addMessage', {
        message: "Lobby full, please select your pieces!"
    });

    Communication.onMessageFromClient('piece.select', function(sessionId, message){

        if (!playerToPiece[sessionId]){
            Communication.sendMessageToClient('panel.addMessage', {
                message: "Player " + sessionId + " has picked " + nameToDisplay[message.piece]
            });
        }
        playerToPiece[sessionId] = message.piece;
        if (_.size(playerToPiece) === 4 && !cardsDealt){

            Communication.sendMessageToClient('panel.addMessage', {
                message: "Let the game begin! Here are your cards."
            });

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
            cardsDealt = true;
        }

    });

    Communication.onMessageFromClient('player.move', function(sessionId, message){
        Communication.sendMessageToClient('player.move', message);
    });
}