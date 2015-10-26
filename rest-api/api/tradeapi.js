"use strict";

var mongoose = require('mongoose')
    , express = require('express')
    , tradeSchema = require('../models/trade.js')
    , authorSchema = require('../models/author.js')
    , facebookcredentials = require('../facebook/facebook-credentials')
    , passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , logger = require('morgan')
    , session = require('express-session')
    , cookieParser = require("cookie-parser")
    , methodOverride = require('method-override')
    , bodyParser = require('body-parser');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: facebookcredentials.FACEBOOK_APP_ID,
    clientSecret: facebookcredentials.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));





var tradeApi = {
    start: function() {
        var app = express();    
        
        app.use(bodyParser.urlencoded({ extended: false }));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');
  app.use(logger());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/public'));

  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
        
        

        mongoose.connect('mongodb://localhost/MongoDB');
        var tradeModel = mongoose.model('tradeModel', tradeSchema);
        var authorModel = mongoose.model('authorModel', authorSchema);
        
        
        app.get('/login', function(req, res){
          res.render('login', { user: req.user });
        });
        
        // GET /auth/facebook
        //   Use passport.authenticate() as route middleware to authenticate the
        //   request.  The first step in Facebook authentication will involve
        //   redirecting the user to facebook.com.  After authorization, Facebook will
        //   redirect the user back to this application at /auth/facebook/callback
        app.get('/auth/facebook',
          passport.authenticate('facebook'),
          function(req, res){
            // The request will be redirected to Facebook for authentication, so this
            // function will not be called.
          });

        // GET /auth/facebook/callback
        //   Use passport.authenticate() as route middleware to authenticate the
        //   request.  If authentication fails, the user will be redirected back to the
        //   login page.  Otherwise, the primary route function function will be called,
        //   which, in this example, will redirect the user to the home page.
        app.get('/auth/facebook/callback', 
          passport.authenticate('facebook', { failureRedirect: '/login' }),
          function(req, res) {
            res.redirect('/');
          });

        app.get('/logout', function(req, res){
          req.logout();
          res.redirect('/');
        });
        
        // Simple route middleware to ensure user is authenticated.
        //   Use this route middleware on any resource that needs to be protected.  If
        //   the request is authenticated (typically via a persistent login session),
        //   the request will proceed.  Otherwise, the user will be redirected to the
        //   login page.
        function ensureAuthenticated(req, res, next) {
          if (req.isAuthenticated()) { return next(); }
          res.redirect('/login')
        }

        /*
            My stuff goes here...        
        */

        
        
        
        app.get('/', function (req, res) {
            res.render('index');
            // res.send('Root of the application');
        });

        app.get('/api', ensureAuthenticated, function (req, res) {
            res.send('API is running');
        });

        // POST to CREATE
        app.post('/api/trades', ensureAuthenticated,function (req, res) {
            var trade;
            console.log("POST: ");
            console.log(req.body);
            trade = new tradeModel({
                symbol: req.body.symbol,
                quantity: req.body.quantity
            });

            trade.save(function (err) {
                if (!err) {
                    return console.log("created");
                } else {
                    return console.log(err);
                }
            });
            return res.send(trade);
        });

        app.post('/api/authors', function (req, res) {
            var author;
            console.log(req.body);
            author = new authorModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                id: req.body.id
            });

            author.save(function (err) {
                if (!err) {
                    return console.log("created");
                } else {
                    return console.log(err);
                }
            });
            return res.send(author);
        });

        // List products
        app.get('/api/trades', function (req, res) {
            return tradeModel.find(function (err, products) {
                if (!err) {
                    return res.send(products);
                } else {
                    return console.log(err);
                }
            });
        });

        // List authors
        app.get('/api/authors', function (req, res) {
            return authorModel.find(function (err, authors) {
                if (!err) {
                      res.header("Access-Control-Allow-Origin", "*");
                      res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    return res.send(authors);
                } else {
                    return console.log(err);
                }
            });
        });

        // Single product
        app.get('/api/trades/:id', ensureAuthenticated, function (req, res) {
            return tradeModel.findById(req.params.id, function (err, product) {
                if (!err) {
                    return res.send(product);
                } else {
                    return console.log(err);
                }
            });
        });

        // Single author
        app.get('/api/authors/:id', function (req, res) {
            return authorModel.findById(req.params.id, function (err, author) {
                if (!err) {
                      res.header("Access-Control-Allow-Origin", "*");
                      res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    return res.send(author);
                } else {
                    return console.log(err);
                }
            });
        });


        

        // Single update
        app.put('/api/trades/:id', ensureAuthenticated, function (req, res) {
            return tradeModel.findById(req.params.id, function (err, trade) {
                // product.symbol = req.body.symbol;
                trade.quantity = req.body.quantity;

                return trade.save(function (err) {
                    if (!err) {
                        console.log("updated");
                    } else {
                        console.log(err);
                    }
                    return res.send(trade);
                });
            });
        });
                
        var server = app.listen(3000, function () {
            var host = server.address().address;
            var port = server.address().port;
            console.log('App listening at http://%s:%s', host, port);
        });    
    }
};

module.exports = tradeApi;



