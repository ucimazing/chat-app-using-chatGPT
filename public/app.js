$(function () {
    var socket = io();

    // Emit chat message to the server
    $('#chat-form').submit(function() {
        socket.emit('chat message', $('#message-input').val());
        $('#message-input').val('');
        return false;
    });

    // Listen for chat message events from the server
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
        // Auto-scroll to the latest message
        $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
    });
});
