'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  image: String,
  title: String,
  
   tourId : String,
   tourIdArr : [String],
   sharedCounter:Number,
  
  description: String,
  location: String,
  xCoordinate: String,
  yCoordinate: String,
  imageSource : String,
  
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('LocationSchema', LocationSchema);