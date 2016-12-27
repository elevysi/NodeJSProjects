var express = require("express");
var router = express.Router();
var Snap = require("../models/snap");

// router.get('snaps', (request, response) => {
    // Snap.find({}, (err, resources) => {
    //     if(err) response.send(err).status(404);
    //     else response.send(resources).status(200);
    // });
// });

// router.post('snap', function (request, response){
    // var snap = new Model(request.body);
    // snap.save((err, resource) => {
    //     if(err) response.send(err).status(501);
    //     else response.json(resource).status(201);
    // })
// });

// module.exports = router;

exports.list = (req, res, next) => {
    Snap.find({}, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            // console.log(resources);
            res.send(resources).status(200);
        }
    });
};

exports.add = (req, res, next) => {
    // var snap = req.body;
    // var snap = new Snap(req.body); // I have already created a snap out of it but it is nt the same as Angular's snap, can we map them like ORM?

    // console.log("Here is what I have posted!" +req.body.snap.name);
    var snap = new Snap(req.body.snap);
    // console.log("Adding this snap " + snap.name);
    snap.save((err, resource) => {
        if(err) res.send(err).status(501);
        else res.json(resource).status(201); //201 HTML code for created
    });
};

exports.deleteSnap = (req, res, err) => {
    var id = req.params.id;
    Snap.remove({_id : id}, (err, resource) => {
        if(err) res.send(err).status(501);
        else res.send(resource).status(200);
    });
    // console.log("Deleting this id "+ req.params.id);
    // User.get(req.params.id, (err, user) => {
	// 	if(err) next(err);
	// 	if(! user.id) return res.send(404);
	// 	res.json(user);
	// });
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