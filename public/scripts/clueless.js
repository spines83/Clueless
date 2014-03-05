var ws = new WebSocket('ws://localhost:4000');

var stage; 	 	   //the board canvas object
var width = 800;   //width of the board game in pixels
var height = 600;  //height of the board game in pixels
var rooms = new Array();   //array of rooms and their properties
var player = {}; 	   	   //Player object, holds reference to player's piece object and player's character name
var green;
var mustard;
var peacock;
var plum;
var scarlet;
var white;
var pieceSelected = false; //set to true once player select's their piece

// Handler for messages coming from the server
// sets the new room location of a piece
ws.onmessage = function(event){
	obj = jQuery.parseJSON(event.data);
	var position = refinePosition(obj.player,obj.room); //get the x, y coordinates to move the piece
	switch(obj.player) { //based on the suspect name, move the piece
            case 'green':
                green.x = position[0];
                green.y = position[1];
                break;
            case 'mustard':
                mustard.x = position[0];
                mustard.y = position[1];
                break;
            case 'peacock':
                peacock.x = position[0];
                peacock.y = position[1];
                break;
            case 'plum':
                plum.x = position[0];
                plum.y = position[1];
                break;
            case 'scarlet':
                scarlet.x = position[0];
                scarlet.y = position[1];
                break;
            case 'white':
                white.x = position[0];
                white.y = position[1];
                break;
        }
        stage.update();
};

// define room properties --------------------------------------------------------------------------------------------------------------------------------------------
//
// the Study
rooms['study'] = new Array();
rooms['study']['coordinates'] = new Array(0,200,0,150); //xmin, xmax, ymin, ymax
rooms['study']['targets'] = new Array('studyLibraryHall','studyHallHall','studySecretPassage'); //valid move targets
rooms['study']['center'] = new Array(100,75); //x,y coordinates of center of room
// the Hallway between the Study and Library
rooms['studyLibraryHall'] = new Array();
rooms['studyLibraryHall']['coordinates'] = new Array(50,150,150,225);
rooms['studyLibraryHall']['targets'] = new Array('study','library');
rooms['studyLibraryHall']['center'] = new Array(100,188);
// the Library
rooms['library'] = new Array();
rooms['library']['coordinates'] = new Array(0,200,225,375);
rooms['library']['targets'] = new Array('studyLibraryHall','libraryConservatoryHall','libraryBilliardRoomHall');
rooms['library']['center'] = new Array(100,300);
// the Hallway between the Library and Conservatory
rooms['libraryConservatoryHall'] = new Array();
rooms['libraryConservatoryHall']['coordinates'] = new Array(50,150,375,450);
rooms['libraryConservatoryHall']['targets'] = new Array('library','conservatory');
rooms['libraryConservatoryHall']['center'] = new Array(100,412);
// the Conservatory
rooms['conservatory'] = new Array();
rooms['conservatory']['coordinates'] = new Array(0,200,450,600);
rooms['conservatory']['targets'] = new Array('libraryConservatoryHall','conservatoryBallRoomHall','conservatorySecretPassage');
rooms['conservatory']['center'] = new Array(100,525);
// the Hallway between the Conservatory and Ball Room
rooms['conservatoryBallRoomHall'] = new Array();
rooms['conservatoryBallRoomHall']['coordinates'] = new Array(200,300,490,565);
rooms['conservatoryBallRoomHall']['targets'] = new Array('conservatory','ballRoom');
rooms['conservatoryBallRoomHall']['center'] = new Array(250,528);
// the Ball Room
rooms['ballRoom'] = new Array();
rooms['ballRoom']['coordinates'] = new Array(300,500,450,600);
rooms['ballRoom']['targets'] = new Array('conservatoryBallRoomHall','ballRoomBilliardRoomHall','ballRoomKitchenHall');
rooms['ballRoom']['center'] = new Array(400,525);
// the Hallway between the Ball Room and Kitchen
rooms['ballRoomKitchenHall'] = new Array();
rooms['ballRoomKitchenHall']['coordinates'] = new Array(500,600,490,565);
rooms['ballRoomKitchenHall']['targets'] = new Array('ballRoom','kitchen');
rooms['ballRoomKitchenHall']['center'] = new Array(550,528);
// the Kitchen
rooms['kitchen'] = new Array();
rooms['kitchen']['coordinates'] = new Array(600,800,450,600);
rooms['kitchen']['targets'] = new Array('ballRoomKitchenHall','kitchenDiningRoomHall','kitchenSecretPassage');
rooms['kitchen']['center'] = new Array(700,525);
// the Hallway between the Kitchen and Dining Room
rooms['kitchenDiningRoomHall'] = new Array();
rooms['kitchenDiningRoomHall']['coordinates'] = new Array(650,750,375,450);
rooms['kitchenDiningRoomHall']['targets'] = new Array('kitchen','diningRoom');
rooms['kitchenDiningRoomHall']['center'] = new Array(700,412);
// the Dining Room
rooms['diningRoom'] = new Array();
rooms['diningRoom']['coordinates'] = new Array(600,800,225,375);
rooms['diningRoom']['targets'] = new Array('kitchenDiningRoomHall','diningRoomLoungeHall','diningRoomBilliardRoomHall');
rooms['diningRoom']['center'] = new Array(700,300);
// the Hallway between the Dining Room and Lounge
rooms['diningRoomLoungeHall'] = new Array();
rooms['diningRoomLoungeHall']['coordinates'] = new Array(650,750,150,225);
rooms['diningRoomLoungeHall']['targets'] = new Array('diningRoom','lounge');
rooms['diningRoomLoungeHall']['center'] = new Array(700,188);
// the Lounge
rooms['lounge'] = new Array();
rooms['lounge']['coordinates'] = new Array(600,800,0,150);
rooms['lounge']['targets'] = new Array('diningRoomLoungeHall','loungeHallHall','loungeSecretPassage');
rooms['lounge']['center'] = new Array(700,75);
// the Hallway between the Lounge and Hall
rooms['loungeHallHall'] = new Array();
rooms['loungeHallHall']['coordinates'] = new Array(500,600,35,110);
rooms['loungeHallHall']['targets'] = new Array('lounge','hall');
rooms['loungeHallHall']['center'] = new Array(550,73);
// the Hall
rooms['hall'] = new Array();
rooms['hall']['coordinates'] = new Array(300,500,0,150);
rooms['hall']['targets'] = new Array('loungeHallHall','studyHallHall','hallBilliardRoomHall');
rooms['hall']['center'] = new Array(400,75);
// the Hallway between the Hall and Study
rooms['studyHallHall'] = new Array();
rooms['studyHallHall']['coordinates'] = new Array(200,300,35,110);
rooms['studyHallHall']['targets'] = new Array('study','hall');
rooms['studyHallHall']['center'] = new Array(250,73);
// the Hallway between the Hall and Billiard Room
rooms['hallBilliardRoomHall'] = new Array();
rooms['hallBilliardRoomHall']['coordinates'] = new Array(350,450,150,225);
rooms['hallBilliardRoomHall']['targets'] = new Array('billiardRoom','hall');
rooms['hallBilliardRoomHall']['center'] = new Array(400,188);
// the Billiard Room
rooms['billiardRoom'] = new Array();
rooms['billiardRoom']['coordinates'] = new Array(300,500,225,375);
rooms['billiardRoom']['targets'] = new Array('hallBilliardRoomHall','diningRoomBilliardRoomHall','ballRoomBilliardRoomHall','libraryBilliardRoomHall');
rooms['billiardRoom']['center'] = new Array(400,300);
// the Hallway between the Dining Room and Billiard Room
rooms['diningRoomBilliardRoomHall'] = new Array();
rooms['diningRoomBilliardRoomHall']['coordinates'] = new Array(500,600,265,340);
rooms['diningRoomBilliardRoomHall']['targets'] = new Array('billiardRoom','diningRoom');
rooms['diningRoomBilliardRoomHall']['center'] = new Array(550,303);
// the Hallway between the Library and Billiard Room
rooms['libraryBilliardRoomHall'] = new Array();
rooms['libraryBilliardRoomHall']['coordinates'] = new Array(200,300,265,340);
rooms['libraryBilliardRoomHall']['targets'] = new Array('billiardRoom','library');
rooms['libraryBilliardRoomHall']['center'] = new Array(250,303);
// the Hallway between the Ball Room and Billiard Room
rooms['ballRoomBilliardRoomHall'] = new Array();
rooms['ballRoomBilliardRoomHall']['coordinates'] = new Array(350,450,375,450);
rooms['ballRoomBilliardRoomHall']['targets'] = new Array('billiardRoom','ballRoom');
rooms['ballRoomBilliardRoomHall']['center'] = new Array(400,412);
// NOTE:
// the secret passages are fine for now, but we need to determine whether players are in the same room then more logic will be needed
// the Lounge Secret Passage (points to the Conservatory)
rooms['loungeSecretPassage'] = new Array();
rooms['loungeSecretPassage']['coordinates'] = new Array(600,640,120,150);
rooms['loungeSecretPassage']['targets'] = rooms['conservatory']['targets']; //same targets as the conservatory
rooms['loungeSecretPassage']['center'] = rooms['conservatory']['center']; //the coordinates for the conservatory
// the Conservatory Secret Passage (points to the Lounge)
rooms['conservatorySecretPassage'] = new Array();
rooms['conservatorySecretPassage']['coordinates'] = new Array(160,200,450,480);
rooms['conservatorySecretPassage']['targets'] = rooms['lounge']['targets']; //same targets as the lounge
rooms['conservatorySecretPassage']['center'] = rooms['lounge']['center']; //the coordinates for the lounge
// the Study Secret Passage (points to the Kitchen)
rooms['studySecretPassage'] = new Array();
rooms['studySecretPassage']['coordinates'] = new Array(160,200,120,150);
rooms['studySecretPassage']['targets'] = rooms['kitchen']['targets']; //same targets as the kitchen
rooms['studySecretPassage']['center'] = rooms['kitchen']['center']; //the coordinates for the kitchen
// the Kitchen Secret Passage (points to the Study)
rooms['kitchenSecretPassage'] = new Array();
rooms['kitchenSecretPassage']['coordinates'] = new Array(600,640,450,480);
rooms['kitchenSecretPassage']['targets'] = rooms['study']['targets']; //same targets as the study
rooms['kitchenSecretPassage']['center'] = rooms['study']['center']; //the coordinates for the study
//end coordinates for rooms and their targets ----------------------------------------------------------------------------------------------------------------------------


// Player object, holds reference to the board piece object and the character name
function Player(piece, cname, room) {
    this.piece = piece;
    this.cname = cname;
    this.currentRoom = room;
}

// depreciated drawBoard(), not necessary at all, replaced with <img> tag in a div
// on test.html to draw the board directly. No need for html canvas.
//
// drawBoard() places the board.svg image into the html canvas with id="boardCanvas"
//function drawBoard(){
//    var canvas = document.getElementById('boardCanvas');
//    var ctx = canvas.getContext('2d');
//    var img = document.createElement('img');
//    img.onload = function(){
//        ctx.drawImage(this,0,0,width,height);
//    }
//    img.src='/assets/board.svg';
//}

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
    scarlet = new createjs.Container();
    scarlet.x = 272;
    scarlet.y = 373;
    scarlet.addChild(scircle,slabel);
    stage.addChild(scarlet);
    scarlet.onClick = function(){selectPiece(scarlet,'scarlet','loungeHallHall');}


    // create the piece for Col. Mustard
    var mcircle = new createjs.Shape();
    mcircle.graphics.beginFill("#FFDB58").drawCircle(0, 0, 15);
    mcircle.x = mcircle.y = 0;
    var mlabel = new createjs.Text("M", "bold 24px Serif", "#9C7A00");
    mlabel.textAlign = "center";
    mlabel.y = -13;
    mustard = new createjs.Container();
    mustard.x = 292;
    mustard.y = 415;
    mustard.addChild(mcircle, mlabel);
    stage.addChild(mustard);
    mustard.onClick = function(){selectPiece(mustard,'mustard','diningRoomLoungeHall');}

    // create the piece for Mrs. White
    var wcircle = new createjs.Shape();
    wcircle.graphics.beginFill("#FFFFFF").drawCircle(0, 0, 15);
    wcircle.x = wcircle.y = 0;
    var wlabel = new createjs.Text("W", "bold 24px Serif", "#000000");
    wlabel.textAlign = "center";
    wlabel.y = -11;
    white = new createjs.Container();
    white.x = 277;
    white.y = 453;
    white.addChild(wcircle, wlabel);
    stage.addChild(white);
    white.onClick = function(){selectPiece(white,'white','ballRoomKitchenHall');}

    // create the piece for Mr. Green
    var gcircle = new createjs.Shape();
    gcircle.graphics.beginFill("#267527").drawCircle(0, 0, 15);
    gcircle.x = gcircle.y = 0;
    var glabel = new createjs.Text("G", "bold 24px Serif", "#004A01");
    glabel.textAlign = "center";
    glabel.y = -13;
    glabel.x = -1;
    green = new createjs.Container();
    green.x = 227;
    green.y = 453;
    green.addChild(gcircle, glabel);
    stage.addChild(green);
    green.onClick = function(){selectPiece(green,'green','conservatoryBallRoomHall');}

    // create the piece for Prof. Plum
    var plcircle = new createjs.Shape();
    plcircle.graphics.beginFill("#8E4585").drawCircle(0, 0, 15);
    plcircle.x = plcircle.y = 0;
    var pllabel = new createjs.Text("Pl", "bold 24px Serif", "#2B0026");
    pllabel.textAlign = "center";
    pllabel.y = -13;
    plum = new createjs.Container();
    plum.x = 227;
    plum.y = 373;
    plum.addChild(plcircle, pllabel);
    stage.addChild(plum);
    plum.onClick = function(){selectPiece(plum,'plum','studyLibraryHall');}

    // create the piece for Mrs. Peacock
    var pecircle = new createjs.Shape();
    pecircle.graphics.beginFill("#50AEB5").drawCircle(0, 0, 15);
    pecircle.x = pecircle.y = 0;
    var pelabel = new createjs.Text("Pe", "bold 24px Serif", "#00454A");
    pelabel.textAlign = "center";
    pelabel.y = -13;
    peacock = new createjs.Container();
    peacock.x = 207;
    peacock.y = 415;
    peacock.addChild(pecircle, pelabel);
    stage.addChild(peacock);
    peacock.onClick = function(){selectPiece(peacock,'peacock','libraryConservatoryHall');}

    // listener to grab events on the stage
    createjs.Ticker.addListener(stage);

    // draw to the canvas
    stage.update();

} // end drawPieces();

// selectPiece() handles selection of the player's piece
function selectPiece(piece,name,room) {
    if (!pieceSelected) {
        player = new Player(piece,name,room);
        player.piece.x = rooms[player.currentRoom]['center'][0];
        player.piece.y = rooms[player.currentRoom]['center'][1];
        pieceSelected = true;
        stage.update();
        ws.send('{"player": "'+player.cname+'","room": "'+player.currentRoom+'"}');
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
            var hit = null;
            for (i=0;i<rooms[player.currentRoom]['targets'].length;i++) { //for each target from the current room, test that the landing coordinates are within range
                if ((player.piece.x >= rooms[rooms[player.currentRoom]['targets'][i]]['coordinates'][0]) && (player.piece.x <= rooms[rooms[player.currentRoom]['targets'][i]]['coordinates'][1]) && (player.piece.y >= rooms[rooms[player.currentRoom]['targets'][i]]['coordinates'][2]) && (player.piece.y <= rooms[rooms[player.currentRoom]['targets'][i]]['coordinates'][3])) {
                    hit = i; //if the coordinates are in range then save the target key
                }
            }
            if (hit != null) { //if the target key (hit) is not null, then we found a valid landing spot, snap the piece to specific coordinates
                var position = refinePosition(player.cname,rooms[player.currentRoom]['targets'][hit]);
                player.piece.x = position[0];
                player.piece.y = position[1];
                player.currentRoom = rooms[player.currentRoom]['targets'][hit]; //update the currentRoom variable with the current room
				ws.send('{"player": "'+player.cname+'","room": "'+player.currentRoom+'"}');
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
    //check if the room is a hallway, if it isn't then we have to modify the target position for the piece in the room
    if ((room != 'studyLibraryHall') && (room != 'libraryConservatoryHall') && (room != 'conservatoryBallRoomHall') && (room != 'ballRoomKitchenHall') && (room != 'kitchenDiningRoomHall') && (room != 'diningRoomLoungeHall') && (room != 'loungeHallHall') && (room != 'hallBilliardRoomHall') && (room != 'diningRoomBilliardRoomHall') && (room != 'libraryBilliardRoomHall') && (room != 'ballRoomBilliardRoomHall') && (room != 'studyHallHall')) {
        switch(cname) { //stagger each piece to avoid overlapping
            case 'green':
                position[0] = rooms[room]['center'][0] - offset;
                position[1] = rooms[room]['center'][1] + offset;
                break;
            case 'mustard':
                position[0] = rooms[room]['center'][0] + offset;
                position[1] = rooms[room]['center'][1];
                break;
            case 'peacock':
                position[0] = rooms[room]['center'][0] - offset;
                position[1] = rooms[room]['center'][1];
                break;
            case 'plum':
                position[0] = rooms[room]['center'][0] - offset;
                position[1] = rooms[room]['center'][1] - offset;
                break;
            case 'scarlet':
                position[0] = rooms[room]['center'][0] + offset;
                position[1] = rooms[room]['center'][1] - offset;
                break;
            case 'white':
                position[0] = rooms[room]['center'][0] + offset;
                position[1] = rooms[room]['center'][1] + offset;
                break;
        }
        return position;
    }
    else { //if the room is a hallway then the center point of the hallway is used
        position[0] = rooms[room]['center'][0];
        position[1] = rooms[room]['center'][1];
        return position;
    }
} //end refinePosition

// menu script using kwicks jquery library
$().ready(function() {
	$('.kwicks').kwicks({
		//maxSize: '50%',
		minSize: 200,
		behavior: 'menu'
	});
});
