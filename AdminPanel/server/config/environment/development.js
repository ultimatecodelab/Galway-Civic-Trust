'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
  //use the local one for development... 
   //uri: 'mongodb://gctadmin:gcttest@ds047085.mongolab.com:47085/galway-tour-app'
   uri: 'mongodb://localhost/Galway-Civic-Trust'
  },

  seedDB: true
};
