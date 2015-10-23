/*
    Start up MongoDB 
    C:\Program Files\MongoDB\Server\3.0\bin>mongod.exe --dbpath C:\src\csprep\rest-api\MongoDB
*/

(function () {
    "use strict";

    var tradeApi = require('./api/tradeapi');

    tradeApi.start();
}());