var Communication = require('./Communication.js');
var GameState = require('./GameState');
var _ = require('underscore');

var sessionIds = [];

exports.init = function(){
    Communication.onMessageFromClient('__register__', function(sessionId, message){
        console.log('new connection from ' + sessionId);

        sessionIds.push(sessionId);

        console.log('number of connected users: ' + _.size(sessionIds));

        if (_.size(sessionIds) === 4){
            console.log("Starting new game!");
            GameState.init(sessionIds);
            sessionIds = {};
        }
    });
};

//exports.handleDisconnectedUser = function(sessionId){
//    if (sessionIds[sessionId]){
//        console.log(sessionId + ' has disconnected.');
//        delete sessionIds[sessionId];
//        console.log('number of connected users: ' + _.size(sessionIds));
//    }
//};
