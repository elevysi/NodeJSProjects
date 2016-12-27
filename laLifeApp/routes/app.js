var express = require("express");
var router = express.Router();
var Snap = require("../models/snap");

router.get("/", function(req, res, err){
    res.render('index');
});

module.exports = router;