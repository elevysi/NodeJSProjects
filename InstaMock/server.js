var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var configs = require('./config/database.js');
configs.dbConnect();

var app = express();

var PORT = process.env.PORT || 7070;
var Pic = require('./models/pic');

app.listen(PORT, () => {
    console.log("Listenning to Port "+PORT);
});