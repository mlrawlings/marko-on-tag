require('marko/node-require').install();

var template = require('./template.marko');
var streamFromArray = require('stream-from-array');
var expect = require('chai').expect;

it('should render a stream', function(done) {
    var users = [{ name:'Bob' }, { name:'Frank' }, { name:'Jill' }];
    var usersStream = streamFromArray.obj(users);

    template.render({ usersStream }, function(err, result, out) {
        if(err) throw err;
        var html = result.toString();

        expect(html).to.eql(`<ul><li>Bob</li><li>Frank</li><li>Jill</li></ul>`);
        done();
    });
})