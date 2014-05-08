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
var deck;

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

            deck = require('./Cards').newDeck()
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
    //determines whether the game has been won, sends message out to players
    Communication.onMessageFromClient('player.accusation', function(sessionId, message){
		//game is won	
		if ((message.suspect === deck.suspect) && (message.weapon === deck.weapon) && (message.room === deck.room)) {
			Communication.sendMessageToClient('panel.addMessage', {
				message: nameToDisplay[message.player]+'won the game. '+nameToDisplay[message.suspect]+' is guilty of the crime.'
				}, 250);
			Communication.sendMessageToClientBySessionId(sessionId, 'panel.addMessage', {
				message: "You've won!"
			}, 500);
		}
		//game is lost (by the accusing player)
		else {
			Communication.sendMessageToClient('panel.addMessage', {
				message: nameToDisplay[message.player]+' unfairly accused '+nameToDisplay[message.suspect]+' of committing the crime and is now out of the game.'
				}, 250);
			Communication.sendMessageToClientBySessionId(sessionId, 'panel.addMessage', {
				message: "You've lost!"
			}, 500);
		}
    });
    //echo messages back to clients that should be added to the message panel
    Communication.onMessageFromClient('panel.addMessage', function(sessionId, message){
        Communication.sendMessageToClient('panel.addMessage', message);
    });
}
