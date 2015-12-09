"use strict";

var SHA256 = require("crypto-js/sha256");
var SECRET = "amilate-andana-secret";

module.exports = function(pass){
    return SHA256(SECRET + pass).toString();
}
