'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//defining the tour schema
var  TourSchema = new Schema({

	title: String, //title of the tour
	description:String, //description of the tour
	image : String, //image of the tour
	category: String, //category of the tour

	_creator : { //who created this tour
		type: Schema.ObjectId,
		ref: 'User'
	},
	email:String, //email of the user
	userName: String, //userName
	createTime: { //time the tour was created
		type:Date,
		'default' : Date.now
	}
});
module.exports = moongoose.model('Tour',TourSchema);
