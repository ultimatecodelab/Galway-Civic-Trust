var _ = require('lodash');
var LocationSchema = require('./tourLocationModal');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');


//updating the Location
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  LocationSchema.findById(req.params.id, function(err, location) {
    if(err) {
      return handleError(res, err);
      }
      if(!location) {
        return res.send(404);
      }
      var updated = _.merge(location, req.body);
      updated.save(function(err) {
        if(err) {
          return handleError(res, err);
        }
        console.log(location);
        return res.json(location);
      });
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

exports.delete = function(req, res) {
  LocationSchema.findById(req.params.id, function(err, location) {
  console.log("The id is :" + req.params.id)
    if(err) {
      return handleError(res, err);
    }
    if(!location) {
      return res.send(404);
    }
    location.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(200);
    });
  });
};

exports.singleLocation = function(req, res) {
  LocationSchema.findById(req.params.locationId, function(err, location) {
    if(err) {
      return handleError(res, err);
    }
    if(!location) {
      return res.send(404);
    }
    return res.json(location);
  });
};

exports.locations = function(req, res) {
//console.log("Testing...")
  var id = req.query.tourId;
  console.log("ID passed as parameter: " + id);
  LocationSchema.find({
    tourId: {
      $in: req.query.tourId
    }
  })
  .sort({
    createTime: -1
  })
  .exec(function(err, spots) {
  
    if(err) {
	//console.log("error are: " + err);
      return handleError(res, err);
    }
	else{
		console.log("found...")
	}
    console.log("Locations are" + spots);
    return res.status(200)
                   .json(spots);
  });
};

