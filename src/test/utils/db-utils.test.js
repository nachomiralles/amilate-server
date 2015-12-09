/**
 * Created by NachoGeotec on 16/10/2015.
 */
'use strict';

var chai = require("chai");
var expect = chai.expect;
//var mongoose = require('mongoose');
var DBUtils = require('../../main/utils/db-utils');
//var User = mongoose.model('User', { name: String });
describe("Testing Mongo Connection", function(){
    before(function(){
       DBUtils.connect();
    });

    it("should works", function(){
        var newUser = new User({name: 'Nacho'});
        newUser.save().then(function(){
            User.find({name: 'Nacho'}, function(err, foundUser){
                expect(foundUser.name).to.equal('Nacasasho');
            });
        });
    });

    after(function(){
        DBUtils.disconnect();
    });
});