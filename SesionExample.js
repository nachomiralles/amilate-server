var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
    var sessionUser = req.session.user;
    console.log("Debug", sessionUser);
    if( !sessionUser ) { // El usuario no se ha logeado
        var user = req.query.user;
        var password = req.query.password;
        login(user, password, req);
        res.send('Bienvenido ' + user);
        next();
        return;
    }
    // Ya tenemos session
    // Ha caducado??
    if( Date.now() > sessionUser.vaffanculo ) {

        res.send("Sorry " + sessionUser.username + " tu sesion ha caducado, jodete");
        req.session.destroy();
        return;
    }
    res.send("Ya te conozco, eres "+sessionUser.username);
    next();
});

var login = function(user, password, req) {
    console.log("Debug", user, password);
    if(user === "nacho" && password === "andrea") {
        // Logged
        req.session.user = {
            username: user,
            vaffanculo: Date.now() + 1000 * 2
        };
    }
};

app.use(function (req, res, next) {
    var views = req.session.views;
    if (!views) {
    views = req.session.views = {}
    }
    // get the url pathname
    var pathname = parseurl(req).pathname;
    // count the views
    views[pathname] = (views[pathname] || 0) + 1;
    console.log("[", pathname, "]", views[pathname]);
    next()
});

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
});

app.listen(4000);
