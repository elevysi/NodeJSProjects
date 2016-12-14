const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
const join = path.join

var photos = [];
photos.push({
name: 'Node.js Logo',
path: 'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
name: 'Ryan Speaking',
path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = (req, res) => {
	res.render('photos', {title: 'Photos', photos: photos});
};

exports.form = (req, res) => {
	res.render('photos/upload', {title: "Upload a Photo"});
};

//Parsing multipart in NodeJS2 pp 334
exports.submit = (dir) => {
	return (req, res, next) => {
		const img = req.files.photo.image;
		const name = req.body.photo.image || img.name;
		const path = join(dir, img.name);

		fs.rename(img.path, path, (err) => {
			if(err) return next(err);

			Photo.create({
				name: name,
				path: img.name
			}, (err) => {
				if(err) return next(err);
				res.redirect('/');
			});

		});
	};
};
	


