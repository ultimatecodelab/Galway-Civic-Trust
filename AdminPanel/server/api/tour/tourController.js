'use strict';
var _ = require('lodash');
var Tour = require('./tourModel');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');


exports.upload = function(req, res) {

console.log(req.body);
  var newTour = new Tour();
  var fileimage = req.middlewareStorage.fileimage;

  newTour.image = '/assets/images/uploads/' + fileimage;
  newTour.email = req.body.email;
  //change this
  
  newTour.title = req.body.title;
  newTour.description = req.body.description;
  
  newTour.xCoordinate = req.body.xCoordinate;
  newTour.yCoordinate = req.body.yCoordinate;
  newTour.imageSource = req.body.imageSource;
  
  newTour.userName = req.body.name;
  newTour._creator = req.body._creator;
  newTour.createTime = Date.now();
 

  newTour.save(function(err, look) {
  console.log("Saving...")
    if(err) {
      console.log('error saving tour');
	  console.log(err);
      return res.send(500);
    } else {
      console.log(look);
      res.status(200)
           .send(look);
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}