'use strict';
//defining controller
var controller  =  require('./tourController');
var express = require('express');
var router  = express.Router();

//importing authencation for protecting the router

var auth = require('../../auth/auth.service');

//Now lets define the routes


module.exports = router;