var express = require("express");
var multer = require('multer');
const util = require('util');
var router = express.Router();
var mime = require('mime');

var Snap = require("../models/snap");

const DIR = './client/uploads/';
const CLIENT_DIR = "uploads/";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.' + mime.extension(file.mimetype))
  }
});

var upload = multer({storage:storage}).single('file');

exports.list = (req, res, next) => {
    Snap.find({}, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            // console.log(resources);
            res.send(resources).status(200);
        }
    });
};


exports.search = (req, res, next) => {
    var term = req.query.term;
    Snap.find({ 'name' : term }, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            // console.log(resources);
            res.send(resources).status(200);
        }
    });
};



exports.add = (dir) => {
    return (req, res, next) => {

        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            /**
             * Create the corresponding snap model item
             */
            // console.log(util.inspect(req.file, {showHidden: false, depth: null}));
            var snap = new Snap({
                "name" : req.body.name,
                "description" : req.body.description,
                "originalname" : req.file.originalname,
                "fileName" : req.file.filename,
                "path" : CLIENT_DIR + req.file.filename,
                "mime" : req.file.mimetype,
                "size" : req.file.size,
            });
            
            snap.save((err, resource) => {
                if(err) res.send(err).status(501);
                else res.json(resource).status(201); //201 HTML code for created
            });
        });   
    };
};

/**
 * Working adding and saving model saving 
 */

// exports.add = (dir) => {
//     return (req, res, next) => {

//         console.log(util.inspect(req.body, {showHidden: false, depth: null}));

        // var snap = new Snap(req.body.snap);
        // // *console.log(util.inspect(snap, {showHidden: false, depth: null}));
        // snap.save((err, resource) => {
        //         if(err) res.send(err).status(501);
        //         else res.json(resource).status(201); //201 HTML code for created
        //     });
//     };
// };



exports.deleteSnap = (req, res, err) => {
    var id = req.params.id;
    Snap.remove({_id : id}, (err, resource) => {
        if(err) res.send(err).status(501);
        else res.send(resource).status(200);
    });
};

exports.getSnap = (req, res, err) => {
    var id = req.params.id;
    Snap.findById(id, (err, resource) => {
        if(err) res.send(err).status(501);
        else{
            // var Snap = resource;
            // console.log("I have found a snap " + Snap.name);
            res.send(resource).status(200);
        }
    });
};

exports.editSnap = (req, res, err) => {

    
    Snap.findById(req.body.snap._id, (err, foundSnap) => {
        if(err) res.send(err).status(501);
        else{

            foundSnap.name = req.body.snap.name || foundSnap.name;
            foundSnap.description = req.body.snap.description || foundSnap.description;

            foundSnap.save((err, resource) => {
                if(err) res.send(err).status(501);
                else res.json(resource).status(200); //201 HTML code for created
            });
            
        }
    });
};