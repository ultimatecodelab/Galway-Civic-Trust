/**
 * Main application routes
 */

'use strict';

//var errors = require('./components/errors');
var auth = require('./auth/auth.service');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  app.use('/api/tour', require('./api/tour'));
 
  app.post('/forgotpassword', require('./forgotpassword').reset);
  

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
