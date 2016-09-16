var chai = require("chai");
var expect = chai.expect;

describe("Hello", function() {
    it("Testing works", function(done) {
        expect("hello").to.eql("hello");
        done();
    });
});
