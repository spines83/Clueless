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
    'clueless/GameState'
], function($, GameStateView, Communication){
    Communication.init('localhost', 4000);
    GameStateView.drawPieces();
});
