'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//schema of location
var LocationSchema = new Schema({
  image: String,
  title: String,
  tourId : String,
  tourIdArr : [String],//tour it belongs to. ID of the tour is stored in an array
  sharedCounter:Number, //how many times the location has been used in other tours
  description: String,
  location: String,
  xCoordinate: String,
  yCoordinate: String,
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