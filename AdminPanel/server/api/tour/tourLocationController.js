var _ = require('lodash');
var LocationSchema = require('./tourLocationModal');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');


exports.locations = function(req, res) {
  var id = req.query.id;
  LocationSchema.find({
    tourId: {
      $in: id
    }
  })
  .sort({
    createTime: -1
  })
  .exec(function(err, locations) {
    if(err) {
      return handleError(res, err);
    }
    console.log(locations);
    return res.status(200)
                   .json(locations);
  });
};


exports.upload = function(req, res) {
  var newLocation = new LocationSchema();
  var fileimage = req.middlewareStorage.fileimage;

  console.log(req.body);
  newLocation.image = '/assets/images/uploads/' + fileimage;

  newLocation.title = req.body.title;
  newLocation.description = req.body.description;
  newLocation.location = req.body.location;
  newLocation.xCoordinate = req.body.xCoordinate;
  newLocation.yCoordinate = req.body.yCoordinate;
  newLocation.imageSource = req.body.imageSource;
  //tour cat id
  newLocation.tourId = req.body.tourId;
 
  newLocation.createTime = Date.now();

  newLocation.save(function(err, look) {
    if(err) {
      console.log('error saving look');
      return res.send(500);
    } else {
      console.log(look);
      res.status(200)
           .send(look);
    }
  });
};