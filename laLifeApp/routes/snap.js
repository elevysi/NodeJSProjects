var mongoose = require('mongoose');
var Snap = mongoose.model('Snap');
var path = require('path');
var moment = require('moment');

var configs = require("../configs/secret");

module.exports.snap = function(req, res, next) {
    Snap
      .findById(req.params.id)
      // .findOne({name : req.params.id})
      .exec(function(err, snap) {
        res.render('snap', {snap: snap, moment: moment});
      });
//   }
};

