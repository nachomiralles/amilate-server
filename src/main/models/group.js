/**
 * Created by NachoGeotec on 16/10/2015.
 */
'use strict';
var User = require('./user');

class Group {
    constructor(name, creationDate, description) {
        this._id = name + creationDate; // TODO Change when including MongoDB
        this.name = name;
        this.creationDate = creationDate;
        this.description = description;
        this.users = [];
    }
}

module.exports = Group;