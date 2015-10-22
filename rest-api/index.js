/*
    Start up MongoDB 
    C:\Program Files\MongoDB\Server\3.0\bin>mongod.exe --dbpath C:\src\csprep\rest-api\MongoDB
*/

var mongoose = require('mongoose');
var express = require('express');
var tradeSchema = require('./models/trade.js');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/MongoDB');
var tradeModel = mongoose.model('tradeModel', tradeSchema);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api', function (req, res) {
    res.send('Ecomm API is running');
});

// POST to CREATE
app.post('/api/trades', function (req, res) {
    var trade;
    console.log("POST: ");
    console.log(req.body);
    trade = new tradeModel({
        symbol: req.body.symbol,
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

// Single product
app.get('/api/trades/:id', function (req, res) {
    return tradeModel.findById(req.params.id, function (err, product) {
        if (!err) {
            return res.send(product);
        } else {
            return console.log(err);
        }
    });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
 




var instance = new tradeModel();
instance.symbol = 'JP:2306-TS';
instance.save(function(err){
    console.log(err);
    console.log('done');

});

console.log(instance);