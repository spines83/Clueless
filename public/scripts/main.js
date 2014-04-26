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
], function($, GameStateView, Communication, GameState){
    Communication.init('localhost', 4000);
    GameStateView.drawPieces();
    var gameState = new GameState.Clueless();
});
