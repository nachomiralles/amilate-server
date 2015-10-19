/**
 * Created by NachoGeotec on 15/10/2015.
 */
'use strict';

var chai = require("chai");
var expect = chai.expect;
var request = require('request');
var User = require('../../main/models/user');

describe("Testing User model", function(){
    it("should works", function(){

        var user = new User('Nacho', 'nacho@email.com', '', 1);

        expect(user.name === 'Nacho').to.be.ok;

    })
});