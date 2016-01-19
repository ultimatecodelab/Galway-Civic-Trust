/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
//authencation service
var auth = require('./auth/auth.service');

//path modification
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  //Tour model -- Defined the routes that we are going to use REST Verbs...
  app.use('api/tour',require('./api/user'));
  app.post('/forgotpassword', require('./forgotpassword').reset);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
