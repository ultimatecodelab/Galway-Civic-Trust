'use strict';

var _ = require('lodash');
var Tour = require('./tour.model');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');

//delete tour controller
exports.delete = function(req, res) {
  Tour.findById(req.params.id, function(err, tour) {
  console.log("The id is :" + req.params.id)
    if(err) {
      return handleError(res, err);
    }
    if(!location) {
      return res.send(404);
    }
    tour.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(200);
    });
  });
};
//gets all the published tours
exports.getAllPublishedTours = function(req, res) {
  Tour.find({status:true})
    .sort({
      createTime: -1
    })
    .exec(function(err, looks) {
      if (err) {
        return handleError(res, err);
      }
      if (!looks) {
        return res.send(404);
      }
      console.log(looks);
      return res.status(200)
                     .json(looks);
    });
};
//displays all tours
exports.allTours = function(req, res) {
  Tour.find({})
    .sort({
      createTime: -1
    })
    .exec(function(err, looks) {
      if (err) {
        return handleError(res, err);
      }
      if (!looks) {
        return res.send(404);
      }
      console.log(looks);
      return res.status(200)
                     .json(looks);
    });
};
//user specific tours
exports.userTours = function(req, res) {
  var userEmail = req.query.email;
  Tour.find({
    email: {
      $in: userEmail
    }
  })
  .sort({
    createTime: -1
  })
  .exec(function(err, tours) {
    if(err) {
      return handleError(res, err);
    }
    console.log(tours);
    return res.status(200)
                   .json(tours);
  });
};

//updating tour
exports.updateTour = function(req, res) {
  Tour.findById(req.body.tourid, function(err, tour) {
    if(err) {
      return handleError(res, err);
    }
    if(!tour) {
      return res.send(404);
    }
	try {
     var fileimage = req.middlewareStorage.fileimage;
	 tour.image = '/assets/images/uploads/' + fileimage;
	}
	catch(err) {
		console.log("no image found...")
	}
  tour.title = req.body.title;
  tour.description = req.body.description;
  tour.status = req.body.status;
  tour.createTime = Date.now();

  tour.save(function(err, savedTour) {
    if(err) {
      console.log('error saving tour');
      return res.send(500);
    } else {
      console.log(savedTour);
		   return res.json(savedTour);
    }
  });
    
  });
};

//upload function to upload a tour
exports.upload = function(req, res) {
  var newTour = new Tour();
  var fileimage = req.middlewareStorage.fileimage;
	
  console.log("The description is :"+ req.body.description);
  newTour.image = '/assets/images/uploads/' + fileimage;
  newTour.title = req.body.title;
  newTour.description = req.body.description;
  newTour.status = req.body.status;
  newTour.createTime = Date.now();

  newTour.save(function(err, look) {
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

//function to return the single tour
/*
This js file contains all the controllers/functions required for CRUD operations and retrival of tours.
please check index.js file, every API route contains a specific controller and based on the type of request, the 
routes are protected using jwt
*/

exports.singleTour = function(req, res) {
  Tour.findById(req.params.tourID, function(err, tour) {
    if(err) {
      return handleError(res, err);
    }
    if(!tour) {
      return res.send(404);
    }
    return res.json(tour);
  });
};

//deleting the tour
exports.delete = function(req, res) {
  Tour.findById(req.params.id, function(err, look) {
    if(err) {
      return handleError(res, err);
    }
    if(!look) {
      return res.send(404);
    }
    look.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(200);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}