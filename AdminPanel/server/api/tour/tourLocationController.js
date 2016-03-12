var _ = require('lodash');
var LocationSchema = require('./tourLocationModal');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');


exports.linkTour = function(req, res) {

	console.log("Printing..................." + req.body.TourID)
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
 //unlink Tour-------------------->>>>>
 exports.unlinkTour = function(req, res) {
	console.log("Printing..................." + req.body.TourID)
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
exports.upload = function(req, res) {
  var newLocation = new LocationSchema();
  var fileimage = req.middlewareStorage.fileimage;

  console.log(req.body);
  newLocation.image = '/assets/images/uploads/' + fileimage;

  newLocation.title = req.body.title;
  newLocation.tourIdArr.push(req.body.tourId)
  newLocation.sharedCounter = 1;
  newLocation.description = req.body.description;
  newLocation.location = req.body.location;
  newLocation.xCoordinate = req.body.xCoordinate;
  newLocation.yCoordinate = req.body.yCoordinate;
  newLocation.imageSource = req.body.imageSource;
  //tour cat id
  newLocation.tourId = req.body.tourId;
 
  newLocation.createTime = Date.now();

  newLocation.save(function(err, look) {
    if(err) {
      console.log('error saving location');
      return res.send(500);
    } else {
      console.log(look);
      res.status(200)
           .send(look);
    }
  });
};

exports.delete = function(req, res) {
  LocationSchema.findById(req.params.id, function(err, location) {
  console.log("The id is :" + req.params.id)
    if(err) {
      return handleError(res, err);
    }
    if(!location) {
      return res.send(404);
    }
	//if()
	//var index = location.tourIdArr.indexOf(req.params.id);
	//array.splice(index, 1);
    location.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(200);
    });
  });
};

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

//one of the important function...
exports.locations = function(req, res) {
//console.log("Testing...")
  var id = req.query.tourId;
  //algorithm
  //loop through the collections
  console.log("ID passed as parameter: " + id);
  
  LocationSchema.find({
    tourIdArr: {
      $in: [req.query.tourId]
    }
  })
  .sort({
    createTime: -1
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
//--------------------------------------------
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
	  loc.imageSource = req.body.imageSource;
	  
	  loc.createTime = Date.now();

	  loc.save(function(err, savedTour) {
		if(err) {
		  console.log('error saving tour');
		  return res.send(500);
		} else {
		  console.log(savedTour);
		  //res.status(200)
			   //.send(look);
			   return res.json(savedTour);
		}
	  });
		
	  });
	  
};

