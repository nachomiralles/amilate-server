/**
 * Created by NachoGeotec on 16/10/2015.
 */
'use strict';

var chai = require("chai");
var expect = chai.expect;
var request = require('request');
var Group = require('../../main/models/group');

describe("Testing Group model", function(){
    it("should works", function(){
        var group = new Group('GroupOne', '15/11/2015', 'This is a test group');
        expect(group.name).to.equal('GroupOne');
    })
});