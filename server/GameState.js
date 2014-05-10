var Communication = require('./Communication.js');
var _ = require('underscore');

var playerIds = [];
var moveIdArray = [];

var moveNo = 0;
var cardsDealt = false;
var playerIdToInfo = {};

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
var roomToDisplay = {
    study: "the Study",
    studyLibraryHall: "the hallway between the Study and the Library",
    library: "the Library",
    libraryConservatoryHall: "the hallway between the Library and the Conservatory",
    conservatory: "the Conservatory",
    conservatoryBallRoomHall: "the hallway between the Conservatory and the Ballroom",
    ballroom: "the Ballroom",
    ballRoomKitchenHall: "the hallway between the Ballroom and the Kitchen",
    kitchen: "the Kitchen",
    kitchenDiningRoomHall: "the hallway between the Kitchen and the Dining Room",
    diningroom: "the Dining Room",
    diningRoomLoungeHall: "the hallway between the Dining Room and the Lounge",
    lounge: "the Lounge",
    loungeHallHall: "the hallway between the Lounge and the Hall",
    hall: "the Hall",
    studyHallHall: "the hallway between the Study and the Hall",
    hallBilliardRoomHall: "the hallway between the Billiard Room and the Hall",
    billiardroom: "the Billiard Room",
    diningRoomBilliardRoomHall: "the hallway between the Dining Room and the Billiard Room",
    libraryBilliardRoomHall: "the hallway between the Library and the Billiard Room",
    ballRoomBilliardRoomHall: "the hallway between the Ball Room and the Billiard Room",
    loungeSecretPassage: "a secret passage in the Lounge",
    conservatorySecretPassage: "a secret passage in the Conservatory",
    studySecretPassage: "a secret passage in the Study",
    kitchenSecretPassage: "a secret passage in the Kitchen"
}

exports.getCardsBySessionId = function(sessionId){
    return playerIdToInfo[sessionId].cards;
};

exports.init = function(playerIdArray){

    playerIds = playerIdArray.slice();
    moveIdArray = playerIdArray.slice();

    Communication.sendMessageToClient('panel.addMessage', {
        message: "Lobby full, please select your pieces!"
    });

    Communication.onMessageFromClient('piece.select', function(sessionId, message){

        if (!playerIdToInfo[sessionId]){
            Communication.sendMessageToClient('panel.addMessage', {
                message: "Player " + sessionId + " has picked " + nameToDisplay[message.piece]
            });
        }
        playerIdToInfo[sessionId] = {
            piece: message.piece,
            cards: []
        };

        if (_.size(playerIdToInfo) === 4 && !cardsDealt){

            Communication.sendMessageToClient('panel.addMessage', {
                message: "Let the game begin! Here are your cards."
            });

            // Move remaining pieces
            var pieces = [];
            _.each(nameToDisplay, function(value, key){
                if (!playerIdToInfo[key]){
                    pieces.push(key);
                }
            });

            Communication.sendMessageToClient('pieces.move.remaining', {
                pieces: pieces
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

                playerIdToInfo[sessionId].cards.push(card);
            }

            cardsDealt = true;
            console.log(JSON.stringify(playerIdToInfo));
        }

    });

    Communication.onMessageFromClient('player.move', function(sessionId, message){
        if (cardsDealt){
            moveNo = moveNo + 1;
            var sessionId = moveIdArray[moveNo % moveIdArray.length];
            console.log('move: ' + moveNo);
            console.log('turn: ' + sessionId);

            // Used by Message Panel
            setTimeout(function(){
                Communication.sendMessageToClientBySessionId(sessionId, 'panel.addMessage', {
                    message: "--- It's your turn to move!! ---"
                });
            }, 250);
        }

        Communication.sendMessageToClient('player.move', message);

        Communication.sendMessageToClient('panel.addMessage', {
            message: nameToDisplay[message.player] + " has moved to " + roomToDisplay[message.room]
        })
    });
    //determines whether the game has been won, sends message out to players
    Communication.onMessageFromClient('player.accusation', function(sessionId, message){
		//game is won	
		if ((message.suspect === deck.suspect) && (message.weapon === deck.weapon) && (message.room === deck.room)) {
			Communication.sendMessageToClient('panel.addMessage', {
				message: nameToDisplay[message.player]+'won the game. '+nameToDisplay[message.suspect]+' is guilty of the crime.'
				}, 250);

            console.log(sessionId);
            console.log(message);
			Communication.sendMessageToClientBySessionId(sessionId, 'panel.addMessage', {
				message: "You've won!"
			}, 500);
		}
		//game is lost (by the accusing player)
		else {
            var idx = moveIdArray.indexOf(sessionId.toString());
            if (idx != -1){
                moveIdArray.splice(idx, 1);
            }
            console.log(moveIdArray);
			Communication.sendMessageToClient('panel.addMessage', {
				message: nameToDisplay[message.player]+' unfairly accused '+nameToDisplay[message.suspect]+' of committing the crime and is now out of the game.'
				}, 250);
			Communication.sendMessageToClientBySessionId(sessionId, 'panel.addMessage', {
				message: "You've lost!"
			}, 500);
		}
    });
    //determines which player should respond to a suggestion
    Communication.onMessageFromClient('player.suggestion', function(sessionId, message){
		var i = playerIds.length;
		var playerIndex = -1;
		var cards = [];
		var type;
		while (i > 0) {
			i = i - 1;
			_.each(exports.getCardsBySessionId(playerIds[i]), function(value, index){
				if ((message.suspect == value.replace(/ /g, '').replace(/\./g,'').toLowerCase()) || (message.room == value.replace(/ /g, '').replace(/\./g,'').toLowerCase()) || (message.weapon == value.replace(/ /g, '').replace(/\./g,'').toLowerCase())) {
					playerIndex = i;
					i = -1;
					if (message.suspect == value.replace(/ /g, '').replace(/\./g,'').toLowerCase()) { cards.push(message.suspect);}
					if (message.room == value.replace(/ /g, '').replace(/\./g,'').toLowerCase()) { cards.push(message.room);}
					if (message.weapon == value.replace(/ /g, '').replace(/\./g,'').toLowerCase()) { cards.push(message.weapon);}
				}
			});
		}
		if (sessionId === playerIds[playerIndex]) { //the case where the only person holding matching cards is the player who made the suggestion
			type = 0;
		}
		if (playerIndex === -1) { //the case where no players have any of the suggested cards
			type = 0;
		}
		else { //the normal case (someone has cards that match the suggestion)
			type = 1;
			Communication.sendMessageToClientBySessionId(playerIds[playerIndex], 'player.suggestion', {
					type: type,
					cards: cards,
					player: message.player
				});
		}
	});
	
    //echo messages back to clients that should be added to the message panel
    Communication.onMessageFromClient('panel.addMessage', function(sessionId, message){
        Communication.sendMessageToClient('panel.addMessage', message);
    });
}
