require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'lib/jquery-2.1.0'
    }
});

require([
    'jquery',
    'clueless/GameStateView',
    'clueless/Communication',
    'clueless/MessageView'
], function($, GameStateView, Communication, MessageView){
    Communication.init('localhost', 4000);
    MessageView.init();
    GameStateView.drawPieces();
});
