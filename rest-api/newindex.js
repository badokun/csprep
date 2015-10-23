/*
    Start up MongoDB 
    C:\Program Files\MongoDB\Server\3.0\bin>mongod.exe --dbpath C:\src\csprep\rest-api\MongoDB

    Debugging
    https://greenido.wordpress.com/2013/08/27/debug-nodejs-like-a-pro/

*/



(function () {
    "use strict";

    var tradeApi = require('./api/tradeapi');

    tradeApi.start();
}());