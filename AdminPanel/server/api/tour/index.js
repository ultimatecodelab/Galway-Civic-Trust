'use strict';

var controller = require('./tour.controller');
var tourLocationController = require('./tourLocationController');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var basicAuth = require('basic-auth');


var basicAuthentication = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};

router.post('/upload', auth.isAuthenticated(), controller.upload);

router.post('/uploadLocation', auth.isAuthenticated(), tourLocationController.upload);
router.get('/getLocations', tourLocationController.locations);
//update
router.put('/:id', auth.isAuthenticated(), tourLocationController.update);

router.put('/linkLocation/:id',auth.isAuthenticated(), tourLocationController.linkTour);
router.put('/unlinkLocation/:id',auth.isAuthenticated(), tourLocationController.unlinkTour);


router.get('/getAllTours', controller.allTours);
router.get('/getAllLocations', tourLocationController.allLocations);
//get the location details (single location)
router.get('/:locationId', tourLocationController.singleLocation);
router.get('/getAllToursJson',basicAuthentication, controller.allTours);

router.delete('/:id',auth.isAuthenticated(), tourLocationController.delete);

router.delete('/deleteTour/:id',auth.isAuthenticated(), controller.delete);

module.exports = router;