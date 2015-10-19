/**
 * Created by NachoGeotec on 16/10/2015.
 */
var port = process.argv[2];

if( isNaN(parseInt(port)) )
    throw new Error("Port is not a number");

if( port <= 1000 && port > 65000 )
    throw new Error("Port is not in range");

if( !port )
    port = 8080;

var server = require('./server');
server.start(port);