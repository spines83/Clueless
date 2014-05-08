var Communication = require('./Communication.js');
var _ = require('underscore');

var playerIds = [];

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

var roomToDisplay = {
    study: "the Study",
    studyLibraryHall: "the hallway between the Study and the Library",
    library: "the Library",
    libraryConservatoryHall: "the hallway between the Library and the Conservatory",
    conservatory: "the Conservatory",
    conservatoryBallRoomHall: "the hallway between the Conservatory and the Ballroom",
    ballRoom: "the Ballroom",
    ballRoomKitchenHall: "the hallway between the Ballroom and the Kitchen",
    kitchen: "the Kitchen",
    kitchenDiningRoomHall: "the hallway between the Kitchen and the Dining Room",
    diningRoom: "the Dining Room",
    diningRoomLoungeHall: "the hallway between the Dining Room and the Lounge",
    lounge: "the Lounge",
    loungeHallHall: "the hallway between the Lounge and the Hall",
    hall: "the Hall",
    studyHallHall: "the hallway between the Study and the Hall",
    hallBilliardRoomHall: "the hallway between the Billiard Room and the Hall",
    billiardRoom: "the Billiard Room",
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

    playerIds = playerIdArray;

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

                playerIdToInfo[sessionId].cards.push(card);
            }

            cardsDealt = true;
            console.log(JSON.stringify(playerIdToInfo));
        }

    });

    Communication.onMessageFromClient('player.move', function(sessionId, message){
        if (cardsDealt){
            moveNo = moveNo + 1;
            var sessionId = playerIdArray[moveNo % playerIdArray.length];
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
    Communication.onMessageFromClient('panel.addMessage', function(sessionId, message){
        Communication.sendMessageToClient('panel.addMessage', message);
    });
}
