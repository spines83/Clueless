define([
    'jquery',
    'clueless/Communication',
    'clueless/GameState'
], function($, Communication, GameState){

    var stage; 	 	   	//the board canvas object
    var width = 800;   	//width of the board game in pixels
    var height = 600;  	//height of the board game in pixels
    var player = {}; 	//Player object, holds reference to player's piece object and player's character name
    var gameState = GameState.newGameInstance(); //gameState object
    var pieceSelected = false; //set to true once player select's their piece

    var exports = {
        drawPieces: function(){
            drawPieces();
        }
    }

	// Handler for piece movement messages coming from the server
	// sets the new room location of a piece
    Communication.onMessageFromServer('player.move', function(obj){
        var position = refinePosition(obj.player,obj.room); //get the x, y coordinates to move the piece
        switch(obj.player) { //based on the suspect name, move the piece
            case 'green':
                gameState.green.x = position[0];
                gameState.green.y = position[1];
                gameState.green.currentRoom = obj.room;
                break;
            case 'mustard':
                gameState.mustard.x = position[0];
                gameState.mustard.y = position[1];
                gameState.mustard.currentRoom = obj.room;
                break;
            case 'peacock':
                gameState.peacock.x = position[0];
                gameState.peacock.y = position[1];
                gameState.peacock.currentRoom = obj.room;
                break;
            case 'plum':
                gameState.plum.x = position[0];
                gameState.plum.y = position[1];
                gameState.plum.currentRoom = obj.room;
                break;
            case 'scarlet':
                gameState.scarlet.x = position[0];
                gameState.scarlet.y = position[1];
                gameState.scarlet.currentRoom = obj.room;
                break;
            case 'white':
                gameState.white.x = position[0];
                gameState.white.y = position[1];
                gameState.white.currentRoom = obj.room;
                break;
        }
        if (obj.player == player.cname) {
			player.currentRoom = obj.room;
		}
		stage.update();
    });
    
    // Update detective notes view when dealt cards
     Communication.onMessageFromServer('card.add', function(obj){
		 var id = "#"+obj.card.replace(/ /g, '').replace(/\./g,'');
		 $(id).prop('checked', true);
		 $(id).prop('disabled', true);
	 });

	// Player object, holds reference to the board piece object and the character name
    function Player(piece, cname, room) {
        this.piece = piece;
        this.cname = cname;
        this.currentRoom = room;
    }

	// drawPieces() places all the board game pieces on the html canvas with id="playerCanvas"
	//		and initializes the stage used to draw objects with the EaselJS framework
    function drawPieces() {
        // create the EaselJS stage
        stage = new createjs.Stage("playerCanvas");

        // create the piece for Miss Scarlet
        var scircle = new createjs.Shape();
        scircle.graphics.beginFill("#FF2400").drawCircle(0, 0, 15);
        scircle.x = scircle.y = 0;
        var slabel = new createjs.Text("S", "bold 24px Serif", "#941500");
        slabel.textAlign = "center";
        slabel.y = -13;
        gameState.scarlet = new createjs.Container();
        gameState.scarlet.x = 272;
        gameState.scarlet.y = 373;
        gameState.scarlet.currentRoom = 'loungeHallHall';
        gameState.scarlet.addChild(scircle,slabel);
        stage.addChild(gameState.scarlet);
        gameState.scarlet.onClick = function(){selectPiece(gameState.scarlet,'scarlet',gameState.scarlet.currentRoom);}


        // create the piece for Col. Mustard
        var mcircle = new createjs.Shape();
        mcircle.graphics.beginFill("#FFDB58").drawCircle(0, 0, 15);
        mcircle.x = mcircle.y = 0;
        var mlabel = new createjs.Text("M", "bold 24px Serif", "#9C7A00");
        mlabel.textAlign = "center";
        mlabel.y = -13;
        gameState.mustard = new createjs.Container();
        gameState.mustard.x = 292;
        gameState.mustard.y = 415;
        gameState.mustard.currentRoom = 'diningRoomLoungeHall';
        gameState.mustard.addChild(mcircle, mlabel);
        stage.addChild(gameState.mustard);
        gameState.mustard.onClick = function(){selectPiece(gameState.mustard,'mustard',gameState.mustard.currentRoom);}

        // create the piece for Mrs. White
        var wcircle = new createjs.Shape();
        wcircle.graphics.beginFill("#FFFFFF").drawCircle(0, 0, 15);
        wcircle.x = wcircle.y = 0;
        var wlabel = new createjs.Text("W", "bold 24px Serif", "#000000");
        wlabel.textAlign = "center";
        wlabel.y = -11;
        gameState.white = new createjs.Container();
        gameState.white.x = 277;
        gameState.white.y = 453;
        gameState.white.currentRoom = 'ballRoomKitchenHall';
        gameState.white.addChild(wcircle, wlabel);
        stage.addChild(gameState.white);
        gameState.white.onClick = function(){selectPiece(gameState.white,'white',gameState.white.currentRoom);}

        // create the piece for Mr. Green
        var gcircle = new createjs.Shape();
        gcircle.graphics.beginFill("#267527").drawCircle(0, 0, 15);
        gcircle.x = gcircle.y = 0;
        var glabel = new createjs.Text("G", "bold 24px Serif", "#004A01");
        glabel.textAlign = "center";
        glabel.y = -13;
        glabel.x = -1;
        gameState.green = new createjs.Container();
        gameState.green.x = 227;
        gameState.green.y = 453;
        gameState.green.currentRoom = 'conservatoryBallRoomHall';
        gameState.green.addChild(gcircle, glabel);
        stage.addChild(gameState.green);
        gameState.green.onClick = function(){selectPiece(gameState.green,'green',gameState.green.currentRoom);}

        // create the piece for Prof. Plum
        var plcircle = new createjs.Shape();
        plcircle.graphics.beginFill("#8E4585").drawCircle(0, 0, 15);
        plcircle.x = plcircle.y = 0;
        var pllabel = new createjs.Text("Pl", "bold 24px Serif", "#2B0026");
        pllabel.textAlign = "center";
        pllabel.y = -13;
        gameState.plum = new createjs.Container();
        gameState.plum.x = 227;
        gameState.plum.y = 373;
        gameState.plum.currentRoom = 'studyLibraryHall';
        gameState.plum.addChild(plcircle, pllabel);
        stage.addChild(gameState.plum);
        gameState.plum.onClick = function(){selectPiece(gameState.plum,'plum',gameState.plum.currentRoom);}

        // create the piece for Mrs. Peacock
        var pecircle = new createjs.Shape();
        pecircle.graphics.beginFill("#50AEB5").drawCircle(0, 0, 15);
        pecircle.x = pecircle.y = 0;
        var pelabel = new createjs.Text("Pe", "bold 24px Serif", "#00454A");
        pelabel.textAlign = "center";
        pelabel.y = -13;
        gameState.peacock = new createjs.Container();
        gameState.peacock.x = 207;
        gameState.peacock.y = 415;
        gameState.peacock.currentRoom = 'libraryConservatoryHall';
        gameState.peacock.addChild(pecircle, pelabel);
        stage.addChild(gameState.peacock);
        gameState.peacock.onClick = function(){selectPiece(gameState.peacock,'peacock',gameState.peacock.currentRoom);}

        // listener to grab events on the stage
        createjs.Ticker.addListener(stage);

        // draw to the canvas
        stage.update();

    } // end drawPieces();

	// selectPiece() handles selection of the player's piece
    function selectPiece(piece,name,room) {
        if (!pieceSelected) {
            player = new Player(piece,name,room);
            var center = gameState.getCenter(player.currentRoom);
            player.piece.x = center[0];
            player.piece.y = center[1];
            pieceSelected = true;
            stage.update();
            Communication.sendMessageToServer('piece.select', {
                piece: player.cname
            });
            Communication.sendMessageToServer('player.move', {
                player: player.cname,
                room: player.currentRoom
            });
            dragDrop(); //once piece is created, call the dragDrop function to handle drags & drops
        }
    }

	// dragDrop() controls the click, drag, and drop of the player's board game piece
    function dragDrop() {
        player.piece.onPress = function(evt) {
            var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
            // handle updating of piece's coordinates during drag
            evt.onMouseMove = function(ev) {
                ev.target.x = ev.stageX+offset.x;
                ev.target.y = ev.stageY+offset.y;
            } //end onMouseMove

            // test whether the drop region is valid on mouse up
            // currently this only checks whether the drop target is adjacent to the current room
            // ultimately this needs to check whether another player's piece is in a hallway since only
            // 1 piece can be in a hallway at the same time
            evt.onMouseUp = function(ev) {
                var target = gameState.isMoveValid(player.currentRoom,player.piece.x,player.piece.y);

                if (target) { //if the target key (hit) is not null, then we found a valid landing spot, snap the piece to specific coordinates
                    var position = refinePosition(player.cname,target);
                    player.piece.x = position[0];
                    player.piece.y = position[1];
                    player.currentRoom = target; //update the currentRoom variable with the current room
                    Communication.sendMessageToServer('player.move', {
                        player: player.cname,
                        room: player.currentRoom
                    });
                }
                else { //if no target was found send the piece back to the starting location, alert the player
                    var position = refinePosition(player.cname,player.currentRoom);
                    player.piece.x = position[0];
                    player.piece.y = position[1];
                    alert("You cannot place your piece here.\nMove to an adjacent space\nor secret passage if available.");
                }
            } //end onMouseUp
        }
    } //end dragDrop()

	// refinePosition(cname,room) takes the room and character name as arguments and modifies the target position for the 9 primary rooms
	// 				this prevents overlaping game pieces. Pieces are keep in the center of hallways since only 1 piece is allowed in a hallway
	//				at a time
    function refinePosition(cname,room) {
        var position = new Array();
        var offset = 40;  //offset the pieces by this amount in the x & y directions
        var center = gameState.getCenter(room);
        //check if the room is a hallway, if it isn't then we have to modify the target position for the piece in the room
        if ((room != 'studyLibraryHall') && (room != 'libraryConservatoryHall') && (room != 'conservatoryBallRoomHall') && (room != 'ballRoomKitchenHall') && (room != 'kitchenDiningRoomHall') && (room != 'diningRoomLoungeHall') && (room != 'loungeHallHall') && (room != 'hallBilliardRoomHall') && (room != 'diningRoomBilliardRoomHall') && (room != 'libraryBilliardRoomHall') && (room != 'ballRoomBilliardRoomHall') && (room != 'studyHallHall')) {
            switch(cname) { //stagger each piece to avoid overlapping
                case 'green':
                    position[0] = center[0] - offset;
                    position[1] = center[1] + offset;
                    break;
                case 'mustard':
                    position[0] = center[0] + offset;
                    position[1] = center[1];
                    break;
                case 'peacock':
                    position[0] = center[0] - offset;
                    position[1] = center[1];
                    break;
                case 'plum':
                    position[0] = center[0] - offset;
                    position[1] = center[1] - offset;
                    break;
                case 'scarlet':
                    position[0] = center[0] + offset;
                    position[1] = center[1] - offset;
                    break;
                case 'white':
                    position[0] = center[0] + offset;
                    position[1] = center[1] + offset;
                    break;
            }
            return position;
        }
        else { //if the room is a hallway then the center point of the hallway is used
            position = gameState.getCenter(room);
            return position;
        }
    } //end refinePosition

	//Make a suggestion
	$("#suggestionButton").on('click', makeSuggestion);
	function makeSuggestion() {
		var validRooms = new Array('study','hall','lounge','library','billiardRoom','diningRoom','conservatory','ballRoom','kitchen');
		if (validRooms.indexOf(player.currentRoom) != -1) {
			Communication.sendMessageToServer('player.suggestion', {
				player: player.cname,
				suspect: $("#suspect").val(),
				room: player.currentRoom,
				weapon: $("#weapon").val()
				});
			Communication.sendMessageToServer('player.move', {
				player: $("#suspect").val(),
				room: player.currentRoom
				});
			Communication.sendMessageToServer('panel.addMessage', {
				message: getSuggestionMessage($("#suspect").val(), $("#weapon").val())
				});
			}
		else { alert('Sorry, you have to be in a room to make a suggestion.');}
	}
	//Generate the message sent to all players when a player makes a suggestion
	function getSuggestionMessage(suspect,weapon) {
		var msg = getFullName(player.cname);
		msg += " suggests that ";
		msg += getFullName(suspect);
		msg += " committed the crime in the ";
		msg += gameState.getRoomName(player.currentRoom);
		msg += " with the ";
		msg += getWeaponName(weapon);
		msg += ".";
		return msg;
	} 
	
	//Make an accusation
	$("#accusationButton").on('click', makeAccusation);
	function makeAccusation() {
		Communication.sendMessageToServer('panel.addMessage', {
			message: getAccusationMessage($("#suspect").val(),$("#room").val(), $("#weapon").val())
			});
		Communication.sendMessageToServer('player.accusation', {
			player: player.cname,
			suspect: $("#suspect").val(),
            room: $("#room").val(),
            weapon: $("#weapon").val()
            },500);

	}
	//Generate the message sent to all players when a player makes an accusation
	function getAccusationMessage(suspect,room,weapon) {
		var msg = getFullName(player.cname);
		msg += " accuses ";
		msg += getFullName(suspect);
		msg += " of committing the crime in the ";
		msg += gameState.getRoomName(room);
		msg += " with the ";
		msg += getWeaponName(weapon);
		msg += ".";
		return msg;
	} 
	
	//Gets full name of suspect / player pieces
	function getFullName(cname) {
		var fullname = "";
		switch(cname) { //stagger each piece to avoid overlapping
                case 'green':
                    fullname = "Mr. Green";
                    break;
                case 'mustard':
                    fullname = "Col. Mustard";
                    break;
                case 'peacock':
                    fullname = "Mrs. Peacock";
                    break;
                case 'plum':
                    fullname = "Prof. Plum";
                    break;
                case 'scarlet':
                    fullname = "Ms. Scarlet";
                    break;
                case 'white':
                    fullname = "Mrs. White";
                    break;
            }
            return fullname;
	}
	
	//Gets full name of weapon
	function getWeaponName(weapon) {
		var fullname = "";
		switch(weapon) { //stagger each piece to avoid overlapping
                case 'candlestick':
                    fullname = "candlestick";
                    break;
                case 'knife':
                    fullname = "knife";
                    break;
                case 'leadpipe':
                    fullname = "lead pipe";
                    break;
                case 'revolver':
                    fullname = "revolver";
                    break;
                case 'rope':
                    fullname = "rope";
                    break;
                case 'wrench':
                    fullname = "wrench";
                    break;
            }
            return fullname;
	}
	
    return exports;
});
