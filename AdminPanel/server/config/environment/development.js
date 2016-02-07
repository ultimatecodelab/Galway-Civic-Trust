'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://127.0.0.1/gct'
	//uri: 'mongodb://gctadmin:gcttest@ds047085.mongolab.com:47085/galway-tour-app'
	
	//mongodb://<dbuser>:<dbpassword>@ds047085.mongolab.com:47085/galway-tour-app
	//mongodb://gcpadmin:gcp00353$@ds057204.mongolab.com:57204/galwaycityparking
  },

  seedDB: true
};
