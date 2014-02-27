var ws = new WebSocket('ws://localhost:4000');

// Handler for messages coming from the server
ws.onmessage = function(event){
    document.getElementById('listGroup').innerHTML +=
        "<li class='list-group-item'>" + event.data + "</li>";
};

// Once the DOM is loaded, we can register the onClick event
// for the "Send Message" button
$(document).ready(function(){
    $('#messageButton').on('click', function(){
        ws.send($('#messageInput').val());
    });
});