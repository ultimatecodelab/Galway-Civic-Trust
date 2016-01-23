'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TourSchema = new Schema({
  image: String,
  title: String,
  description: String,
  location: String,
  xCoordinate: String,
  yCoordinate: String,
  imageSource : String,
  
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: String,
  userName: String,
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('Tour', TourSchema);