var _ = require('underscore');

exports.newDeck = function(){
    return new Deck();
}

var allCards = {
    rooms: ["Study", "Hall", "Lounge", "Library", "Billiard Room",
            "Dining Room", "Conservatory", "Ball Room", "Kitchen"],
    weapons: ["Candlestick", "Knife", "Lead Pipe", "Revolver",
              "Rope", "Wrench"],
    suspects: ["Mr. Green", "Col. Mustard", "Mrs. Peacock",
               "Prof. Plum", "Ms. Scarlet", "Mrs. White"]
}

function Deck(){

    this.room = null,
    this.weapon = null,
    this.suspect = null,
    this.cards = [],
    this.init = function(){
        var roomIndex = Math.floor(Math.random() * allCards.rooms.length);
        var weaponIndex = Math.floor(Math.random() * allCards.weapons.length);
        var suspectIndex = Math.floor(Math.random() * allCards.suspects.length);
        this.room = allCards.rooms[roomIndex];
        this.weapon = allCards.weapons[weaponIndex];
        this.suspect = allCards.suspects[suspectIndex];
        console.log("Room: " + this.room);
        console.log("Weapon: " + this.weapon);
        console.log("Suspect: " + this.suspect);

        var index;;
        for (var key in allCards){
            if (allCards.hasOwnProperty(key)){
                for (index = 0; index < allCards[key].length; index++){
                    if (key === "rooms" && index !== roomIndex){
                        this.cards.push(allCards[key][index]);
                    } else if (key === "weapons" && index !== weaponIndex){
                        this.cards.push(allCards[key][index]);
                    } else if (key === "suspects" && index !== suspectIndex){
                        this.cards.push(allCards[key][index]);
                    }
                }
            }
        }
        this.shuffle();
    }

    this.shuffle = function(){
        this.cards = _.shuffle(this.cards);
    }

    this.getDeck = function(){
        return this.cards;
    }

    this.getCard = function(){
        var card = this.cards[0] || null;
        this.cards = _.rest(this.cards);
        return card;
    }
}
//
//var game = exports.initGame()
//game.init();
//game.shuffle();
////console.log(game.getDeck());
//
//var card;
//while ((card = game.getCard()) != null){
//    console.log(card);
//}
//console.log('done!');
