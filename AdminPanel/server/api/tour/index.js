'use strict';
//defining controller
var controller  =  require('./tourController');
var express = require('express');
var router  = express.Router();

//importing authencation for protecting the router

var auth = require('../../auth/auth.service');

//Now lets define the routes
router.post('/upload', auth.isAuthenticated(), controller.upload);
router.get('/getAllTours',controller.ensureAuthenticated,controller.allTours);


module.exports = router;