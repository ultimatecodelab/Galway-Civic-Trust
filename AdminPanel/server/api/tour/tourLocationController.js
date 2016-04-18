var _ = require('lodash');
var LocationSchema = require('./tourLocationModal');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');

//can link one location to different tour. This prevent the duplication of same data
exports.linkTour = function(req, res) {
	LocationSchema.findById(req.params.id, function(err, location) {
	if(err) {
		return handleError(res, err);
	}
	if(!location) {
	 console.log('failed... ')
	  return res.send(404);
	}
		if(req.body.TourID){
			if(location.tourIdArr.indexOf(req.body.TourID)==-1){
			 
				location.tourIdArr.push(req.body.TourID);
				location.sharedCounter+=1;
				location.save(function(err) {
				if(err) {

				  return handleError(res, err);
				}
				console.log(location);
				return res.json(location);
			  });//end of save*/
			}//if not already linked
	  }//end of if
	  else{
	   return res.send(404);
	  }
	});//end of findby
	
 };
 //unlink location from specified tour controller
 exports.unlinkTour = function(req, res) {
	LocationSchema.findById(req.params.id, function(err, location) {
		if(err) {
			return handleError(res, err);
		}
		if(!location) {
		 console.log('failed... ')
		  return res.send(404);
		}
		
		if(req.body.TourID){
			location.tourIdArr.pull(req.body.TourID);
			location.sharedCounter-=1;
			location.save(function(err) {
			if(err) {

			  return handleError(res, err);
			}
			console.log(location);
			return res.json(location);
		  });//end of save*/
	  }//end of if
	});//end of findby
	
 };
 //controller to retrieve all the locations
exports.allLocations = function(req, res) {
  LocationSchema
  .find({})
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
//updating the Location
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  LocationSchema.findById(req.params.id, function(err, location) {
    if(err) {
      return handleError(res, err);
      }
      if(!location) {
        return res.send(404);
      }
      var updated = _.merge(location, req.body);
      updated.save(function(err) {
        if(err) {
          return handleError(res, err);
        }
        console.log(location);
        return res.json(location);
      });
  });
};
//uploading a new location
exports.upload = function(req, res) {
  var newLocation = new LocationSchema();
  var fileimage = req.middlewareStorage.fileimage; //middlewareStorage to get the file

  console.log(req.body);
  newLocation.image = '/assets/images/uploads/' + fileimage; //image location

  newLocation.title = req.body.title;
  newLocation.tourIdArr.push(req.body.tourId)
  newLocation.sharedCounter = 1;
  newLocation.description = req.body.description;
  newLocation.location = req.body.location;
  newLocation.xCoordinate = req.body.xCoordinate;
  newLocation.yCoordinate = req.body.yCoordinate;
  newLocation.tourId = req.body.tourId;
  newLocation.createTime = Date.now();
  
  newLocation.save(function(err, loc) {
    if(err) {
      console.log('error saving location');
      return res.send(500);
    } else {
      console.log(loc);
      res.status(200)
           .send(loc);
    }
  });
};
//deleting a location
exports.delete = function(req, res) {
  LocationSchema.findById(req.params.id, function(err, location) {
    if(err) {
      return handleError(res, err);
    }
    if(!location) {
      return res.send(404);
    }
    location.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(200);
    });
  });
};
//single location controller
exports.singleLocation = function(req, res) {
  LocationSchema.findById(req.params.locationId, function(err, location) {
    if(err) {
      return handleError(res, err);
    }
    if(!location) {
      return res.send(404);
    }
    return res.json(location);
  });
};
//tour walk number - controller
exports.tourLocationWalk = function(req, res) {
console.log("testing here...")
  var id = req.query.tourId;
  
  LocationSchema.find({
    tourIdArr: {
      $in: [req.params.tourId]
    }//,
	//walkNumber:req.params.walkNumber
  })
  .sort({
    createTime: 1
  })
  .exec(function(err, spots) {
  
    if(err) {
	//console.log("error are: " + err);
      return handleError(res, err);
    }
	else{
		console.log("found...")
	}
    console.log("Locations are" + spots);
    return res.status(200)
                   .json(spots);
  });
};

//returns all the locations, sorted by the created time...
exports.locations = function(req, res) {
  var id = req.query.tourId;
  LocationSchema.find({
    tourIdArr: {
      $in: [req.query.tourId]
    }
  })
  .sort({
    createTime: 1
  })
  .exec(function(err, spots) {
  
    if(err) {
      return handleError(res, err);
    }
    return res.status(200)
                   .json(spots);
  });
};
//update function for updating a location
exports.updateCurrentLocation = function(req, res) {
  LocationSchema.findById(req.body.locationID, function(err, loc) {
    if(err) {
      return handleError(res, err);
    }
    if(!loc) {
      return res.send(404);
    }
	try {
     var fileimage = req.middlewareStorage.fileimage;
	 loc.image = '/assets/images/uploads/' + fileimage;
	}
	catch(err) {
		console.log("no image found...")
	}
	  loc.title = req.body.title;
	  loc.description = req.body.description;
	  loc.location = req.body.location;
	  loc.xCoordinate = req.body.xCoordinate;
	  loc.yCoordinate = req.body.yCoordinate;
	  
	  //loc.walkNumber = req.body.walkNumber;
	  //loc.createTime = Date.now();

	  loc.save(function(err, savedTour) {
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

