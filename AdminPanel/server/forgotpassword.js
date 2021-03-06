//few external dependencies - js files
var nodemailer = require('nodemailer');
var user = require('./api/user/user.controller.js');
var sendgrid  = require('sendgrid')('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');

//function to reset the password
exports.reset = function(req, res) {

	var newPass = user.resetPassword(req.query.email);
	sendgrid.send({
	  from: 'Galway Civic Trust - <noreply@gct.ie>', // sender address
        to: req.query.email,
        subject: 'New password password.', // Subject line
        html: '<b>Your new password is ' + newPass + '.  </b><a href="http://galwaytour.tk">Login here.</a>' // html body
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});

    res.end();
};