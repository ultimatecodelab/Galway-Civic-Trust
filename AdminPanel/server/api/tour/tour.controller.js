'use strict';

var _ = require('lodash');
var Tour = require('./tour.model');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');


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


exports.upload = function(req, res) {
  var newTour = new Tour();
  var fileimage = req.middlewareStorage.fileimage;

  console.log(req.body);
  newTour.image = '/assets/images/uploads/' + fileimage;
  //newTour.email = req.body.email;
  //change this
  //newTour.linkURL = req.body.linkURL;
  newTour.title = req.body.title;
  /*newTour.description = req.body.description;
  newTour.location = req.body.location;
  newTour.xCoordinate = req.body.xCoordinate;
  newTour.yCoordinate = req.body.yCoordinate;
  newTour.imageSource = req.body.imageSource;*/
 // newTour.userName = req.body.name;
 // newTour._creator = req.body._creator;
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


exports.singleTour = function(req, res) {
  Tour.findById(req.params.lookId, function(err, look) {
    if(err) {
      return handleError(res, err);
    }
    if(!look) {
      return res.send(404);
    }
    return res.json(look);
  });
};

exports.popTours = function(req, res) {
  Tour.find(req.params.id)
    .sort('-upVotes')
    .limit(6)
    .exec(function(err, looks) {
      if (err) {
        return handleError(res, err);
      }
      console.log(looks);
      return res.json(looks);
    });
}

exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  Tour.findById(req.params.id, function(err, look) {
    if(err) {
      return handleError(res, err);
      }
      if(!look) {
        return res.send(404);
      }
      var updated = _.merge(look, req.body);
      updated.save(function(err) {
        if(err) {
          return handleError(res, err);
        }
        console.log(look);
        return res.json(look);
      });
  });
};

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

exports.addView = function(req, res) {
  Tour.findById(req.params.id, function(err, look) {
    if(err) {
      return handleError(res, err);
    }
    if (!tour) {
      return res.send(404);
    }
    tour.views++;
    tour.save(function(err) {
      if (err) {
        return handle(res, err);
      }
      return res.json(tour);
    });
  });
};

exports.addUpvote = function(req, res) {
  Tour.findById(req.params.id, function(err, tour) {
    if(err) {
      return handleError(res, err);
    }
    if(!tour) {
      return res.send(404);
    }
    tour.upVotes++;
    tour.save(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.json(tour);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}