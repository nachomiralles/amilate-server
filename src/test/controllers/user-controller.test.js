/**
 * Created by NachoGeotec on 16/10/2015.
 */
var chai = require("chai");
var expect = chai.expect;
var request = require('request');
var server = require('../../../server');

var port = 3131;
describe("Testing UserController", function(){
    before(function(done){
        server.start(port,done);
    });

    it("Should Return OneUser", function(done){
        //expect(true).to.be.ok;
        request("http://localhost:3131/user/pepe", function(error, response, body){
            expect(body).to.equal("pepe");
            done();
        })
    });

    it("Should Return AllUsers", function(done){
        //expect(true).to.be.ok;
        request("http://localhost:3131/user", function(error, response, body){
            expect(body).to.equal("AllUsers");
            done();
        })
    });

    it("Should Return UpdatingUser", function(done){
        //expect(true).to.be.ok;
        request.post({url: 'http://localhost:3131/user', form: {name: "Nacho"}}, function(error, response, body){
            expect(body).to.equal("Nacho");
            done();
        })
    });

    after(function(done){
        server.stop(done);
    });


});
