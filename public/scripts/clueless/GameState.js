define([
    'jquery'
], function($){

	var exports = {
        Clueless: function(){
            Clueless();
        }
    }

		//Game State object
		function Clueless() {
			//piece objects
			this.green = {};
			this.mustard = {};
			this.peacock = {};
			this.plum = {};
			this.scarlet = {};
			this.white = {};
			
			//players
			var players = new Array();
			//add player to gamestate
			this.addPlayer = function (player) {
				players.push(player);
			}
			
			//whose turn it is
			var currentPlayer = null;
			//get current player
			this.getCurrentPlayer = function () {
				return currentPlayer;
			}
			//turn order
			var turnOrder = new Array('scarlet','mustard','white','green','peacock','plum');
			//determine who has next turn
			this.nextTurn = function () {
				var index = turnOrder.indexOf(currentPlayer);
				do {
					if (index < turnOrder.length-1) { index += 1;}
					else { index = 0;}
					}
				while (players.indexOf(turnOrder(index)) == -1);
				currentPlayer = turnOrder(index);
			}
					
			// define room properties
			var rooms = new Array();   //array of rooms and their properties
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
			//end coordinates for rooms and their targets
			//a list of hallways (used for making sure only 1 piece is located in a hallway)
			var hallways = new Array('studyLibraryHall','libraryConservatoryHall','conservatoryBallRoomHall','ballRoomKitchenHall','kitchenDiningRoomHall','diningRoomLoungeHall','loungeHallHall','studyHallHall','hallBilliardRoomHall','diningRoomBilliardRoomHall','libraryBilliardRoomHall','ballRoomBilliardRoomHall');
			
			//return array of valid room targets
			this.getTargets = function (room) {
				return rooms[room]['targets'];
			}
			
			//return array of room center coordinates [x, y]
			this.getCenter = function (room) {
				return rooms[room]['center'];
			}
			
			//return coordinates for a room
			this.getCoordinates = function (room) {
				return rooms[room]['coordinates'];
			}
			
			//check for valid moves
			this.isMoveValid = function (currentRoom, x, y) {
				var target = 0;
				for (i=0;i<this.getTargets(currentRoom).length;i++) { //for each target from the current room, test that the landing coordinates are within range
					if ((x >= this.getCoordinates(this.getTargets(currentRoom)[i])[0]) && (x <= this.getCoordinates(this.getTargets(currentRoom)[i])[1]) && (y >= this.getCoordinates(this.getTargets(currentRoom)[i])[2]) && (y <= this.getCoordinates(this.getTargets(currentRoom)[i])[3])) {
						target = this.getTargets(currentRoom)[i]; //if the coordinates are in range then save the target room
					}
				}
				if ((target) && (-1 != hallways.indexOf(target))) { //if the target room is not null, then determine if the space is occupied (in the case of hallways)
					var playerRooms = new Array(this.green.currentRoom,this.mustard.currentRoom,this.peacock.currentRoom,this.plum.currentRoom,this.scarlet.currentRoom,this.white.currentRoom);
					if (-1 != playerRooms.indexOf(target)) {
						//if there is a match between the target hallway and a location of another piece then the target is invalid
						target = 0;
					}
				}
				return target;
			}
			
			
		}
		//end gameState object


    return exports;

});
