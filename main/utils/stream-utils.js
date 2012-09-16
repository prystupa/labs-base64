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
    this.pending = "";
}
util.inherits(Base64Decode, StreamStack);

Base64Decode.prototype.write = function (data) {

    var encoded = this.pending + data.toString();
    var encodedLength = encoded.length;
    var lastLineBreak = encoded.lastIndexOf("\r\n");
    var lastLineStarts = lastLineBreak >= 0 ? lastLineBreak + 2 : 0;
    var lastLineLength = encodedLength - lastLineStarts;
    var incompleteLastLineLength = lastLineLength % 4;
    var completeEncodedLength = encodedLength - incompleteLastLineLength;

    if (completeEncodedLength) {
        var completeEncoded = encoded.slice(0, completeEncodedLength);
        var decoded = new Buffer(completeEncoded, "base64").toString();
        this.stream.write(decoded);
    }
    this.pending = encoded.slice(completeEncodedLength);
};

exports.Base64Decode = Base64Decode;