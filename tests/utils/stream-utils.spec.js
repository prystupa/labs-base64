/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 9/16/12
 * Time: 4:21 PM
 */

var Base64Decode = require('../../main/utils/stream-utils').Base64Decode;
var MemoryStream = require('memorystream');

describe("Base64 Decode Stream", function () {

    var input;
    var output;
    var target;
    var actual;

    beforeEach(function () {
        input = new MemoryStream();
        output = new MemoryStream();
        target = new Base64Decode(output);

        actual = [];
        output.on('data', function (data) {
            actual.push(data.toString());
        });

        input.pipe(target);
    });

    describe('when I feed an encoded string longer than 76 characters', function () {
        beforeEach(write(encode("1.........2.........3.........4.........5.........6.........7.........8.........")));

        function expectOutput(expected) {
            return function () {
                expect(actual).toEqual(expected);
            };
        }

        it('writes properly decoded string to output stream', expectOutput([
            '1.........2.........3.........4.........5.........6.........7.........8.........'
        ]))
    });


    function write(string) {
        return function () {
            input.write(string);
        };
    }

    function encode(string) {
        return new Buffer(string).toString("base64");
    }
});