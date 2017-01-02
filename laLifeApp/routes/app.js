var express = require("express");
var router = express.Router();
var path = require('path');

exports.index = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/..', 'client/index.html'));
};