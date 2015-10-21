var express = require('express');
var stormpath = require('express-stormpath');

var app = express();
app.use(stormpath.init(app, {
  // Optional configuration options.
  website: true
}));

// Once Stormpath has initialized itself, start your web server!
app.on('stormpath.ready', function() {
  app.listen(3000);
});