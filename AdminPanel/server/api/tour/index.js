'use strict';

var controller = require('./tour.controller');
var tourLocationController = require('./tourLocationController');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/upload', auth.isAuthenticated(), controller.upload);
router.post('/updateTour', auth.isAuthenticated(), controller.updateTour);
router.post('/updateCurrentLocation', auth.isAuthenticated(), tourLocationController.updateCurrentLocation); //location controller
router.post('/uploadLocation', auth.isAuthenticated(), tourLocationController.upload);

//update
router.put('/:id', auth.isAuthenticated(), tourLocationController.update);
router.put('/linkLocation/:id',auth.isAuthenticated(), tourLocationController.linkTour);
router.put('/unlinkLocation/:id',auth.isAuthenticated(), tourLocationController.unlinkTour);


router.get('/getAllTours', controller.allTours);
router.get('/getAllPublishedTours', controller.getAllPublishedTours);
router.get('/getLocations', tourLocationController.locations);
router.get('/getAllLocations', tourLocationController.allLocations);
router.get('/:locationId', tourLocationController.singleLocation);
router.get('/updateTour/:tourID',controller.singleTour);

router.delete('/:id',auth.isAuthenticated(), tourLocationController.delete);
router.delete('/deleteTour/:id',auth.isAuthenticated(), controller.delete);

module.exports = router;