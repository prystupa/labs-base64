/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 9/16/12
 * Time: 4:01 PM
 */

var util = require('util');
var StreamStack = require('stream-stack').StreamStack;

function Base64Decode(stream) {

    StreamStack.call(this, stream);
}
util.inherits(Base64Decode, StreamStack);

Base64Decode.prototype.write = function (data) {
    var decoded = new Buffer(data.toString(), "base64").toString();
    this.stream.write(decoded);
};

exports.Base64Decode = Base64Decode;