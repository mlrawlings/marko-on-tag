module.exports = function(input, out) {
    var stream = input._stream;
    var dataEvent = input._dataEvent || 'data';
    var endEvent = input._endEvent || 'end';
    var render = input.renderBody;

    var asyncOut = out.beginAsync();

    stream.on(dataEvent, function(data) {
        render(asyncOut, data);
    });

    stream.on(endEvent, function() {
        asyncOut.end();
    });

    stream.on('error', function(err) {
        asyncOut.emit('error', err);
        asyncOut.end();
    });
}