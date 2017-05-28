var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var util = require("util");

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){ 
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "success" : true
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

exports.delete = (req, res, err) => {
    var id = req.params.id;
    User.remove({_id : id}, (err, resource) => {
        if(err) res.send(err).status(501);
        else res.send(resource).status(200);
    });
    //remove snap from the Directory
};

module.exports.register = function(req, res) {
  var user = new User(req.body.user);
  user.setPassword(req.body.user.password);

  user.save((err, resource) => {
        if(err) res.send(err).status(501);
        else{
          console.log("User has been saved "+ user.email);
          var token;
          token = user.generateJwt();
          res.status(201); //201 HTML code for created
          res.json({
            "token" : token,
            "success" : true
          });
        } 
    });
};

module.exports.list = function(req, res) {
  User.find({}, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            // console.log(resources);
            res.send(resources).status(200);
        }
    });
};

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};