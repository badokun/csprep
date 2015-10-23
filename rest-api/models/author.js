"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var authorSchema =  new Schema({
    id    		: ObjectId
  , firstName   : String
  , lastName   :  String
});
    
    
module.exports = authorSchema;
