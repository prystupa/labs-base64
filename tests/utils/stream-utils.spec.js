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

    describe('when I feed a small encoded string', function () {
        beforeEach(write("MC4uLi4uLi4uLjEuLi4uLi4uLi4yLi4uLi4uLi4uMy4uLi4uLi4uLg=="));

        it('writes properly decoded string to output stream', expectOutput([
            '0.........1.........2.........3.........'
        ]));
    });

    describe('when I feed a MIME-like new line separated encoded string', function () {
        beforeEach(write("" +
            "MC4uLi4uLi4uLjEuLi4uLi4uLi4yLi4uLi4uLi4uMy4uLi4uLi4uLjQuLi4uLi4uLi41Li4uLi4u" + "\r\n" +
            "Li4uNi4uLi4uLi4uLjcuLi4uLi4uLi4="));

        it('writes properly decoded string to output stream', expectOutput([
            "0.........1.........2.........3.........4.........5.........6.........7........."
        ]));
    });

    function write(string) {
        return function () {
            input.write(string);
        };
    }

    function expectOutput(expected) {
        return function () {
            expect(actual).toEqual(expected);
        };
    }

});
