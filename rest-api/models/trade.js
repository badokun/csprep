"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var tradeSchema =  new Schema({
    tradeId    : ObjectId
  , symbol     : String
  , quantity   : Number
  , date       : Date
});
    
    
module.exports = tradeSchema;
