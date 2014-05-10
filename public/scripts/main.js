require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'lib/jquery-2.1.0',
        underscore: 'lib/underscore'
    }
});

require([
    'jquery',
    'clueless/GameStateView',
    'clueless/Communication',
    'clueless/MessageView'
], function($, GameStateView, Communication, MessageView){
    Communication.init('192.168.1.5', 4000);
    MessageView.init();
    GameStateView.drawPieces();
});
