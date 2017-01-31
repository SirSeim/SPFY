var chai = require("chai");
var expect = chai.expect;
var apiroutes = require("../../routes/api_routes.js");
var request = require('supertest');

describe("Hello", function() {
    it("tests the Testing", function(done) {
        expect("hello").to.eql("hello");
        done();
    });
});

describe("Create Client", function () {
    it("creates a new client profile", function (done) {
        // request.get('/').expect(200); // if expect() gets a number, automatically thinks it's a status code
        done();
    });
});