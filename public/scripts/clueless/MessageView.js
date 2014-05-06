define([
    'jquery',
    'clueless/Communication'
], function($, Communication){

    var messageDiv = $("#messages");

    var exposed = {
        init: function(){
            messageDiv.html('<textarea id="messagePanel" rows="7" cols="142"></textarea>');
            Communication.onMessageFromServer('panel.addMessage', function(obj){
                exposed.addMessage(obj.message);
            })
        },
        addMessage: function(messageText){
            $('#messagePanel').append(messageText + "\n");
        }
    };

    return exposed;

});