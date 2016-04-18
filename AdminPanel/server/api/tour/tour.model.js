'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//tour schema
var TourSchema = new Schema({
  image: String, 
  title: String,
  description:String,
  status: Boolean,'default':false, //published yet ? or not?
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('Tour', TourSchema);