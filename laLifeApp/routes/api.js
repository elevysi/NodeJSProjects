var express = require("express");
var multer = require('multer');
const util = require('util');
var router = express.Router();
var mime = require('mime');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

var fs = require("fs");
var sharp = require("sharp");

var Snap = require("../models/snap");

const UPLODAS_DIR_ABSOLUTE = './client/uploads/';
const UPLOADS_THUMB_DIR_ABSOLUTE = './client/uploads/thumbnails/';

// const PRESS_PLAY = './client/assets/img/playicon.png';

const PRESS_PLAY =  path.join(__dirname + '/..', 'client/assets/img/playicon.png');


const UPLOADS_DIR_RELATIVE = "uploads/";
const UPLOADS_THUMBS_DIR_RELATIVE = "uploads/thumbnails/";


const THUMBANAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 400;



//Dynamic Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // var newDestination = 'uploads/' + req.user._username;

        var parentFolder = UPLODAS_DIR_ABSOLUTE + req.body.userIdentifier + "/";
        var parentStat = null;
        try {
            parentStat = fs.statSync(parentFolder);
        } catch (err) {
            fs.mkdirSync(parentFolder);
        }
        if (parentStat && !parentStat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + parentFolder + '"');
        } 


        var newDestination = parentFolder + "Originals/";
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"');
        }       
        cb(null, newDestination);
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.' + mime.extension(file.mimetype))
  }
});

var upload = multer({
    storage:storage,
    limits: {
            fieldNameSize: 100,
            fileSize: 60000000
    },
}).single('file');



exports.list = (req, res, next) => {

    console.log(PRESS_PLAY);

    Snap.find({
            publicSnap: true // Search Filters
        }
        // ,
//      ['type','date_added'], // Columns to Return,
//      {
    //     skip:0, // Starting Row
    //     limit:10, // Ending Row
    //     sort:{
//          date_added: -1 //Sort by Date Added DESC
//         }
//      }
        )
        .sort({created: 'desc'})
        .limit(20)
        .exec(function(err, resources){
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
            
            var savePathAbsolute = UPLODAS_DIR_ABSOLUTE + req.body.userIdentifier + "/Originals/" + req.file.filename;
            var savePathRelative = UPLOADS_DIR_RELATIVE + req.body.userIdentifier + "/Originals/" + req.file.filename;
            var thumbnailSavePathRelative = "";
            

            var filetypes = /jpeg|jpg|png|gif/;
            var mimetype = filetypes.test(req.file.mimetype);
            var extname = filetypes.test(path.extname(req.file.filename).toLowerCase());

            var thumbnailSaveDirAbsolute = UPLODAS_DIR_ABSOLUTE + req.body.userIdentifier + "/Thumbnails/";
            var thumbnailSavePathAbsolute = thumbnailSaveDirAbsolute + req.file.filename;
            

                // Check if the thumbanil folder has been created
                var stat = null;
                try {
                    stat = fs.statSync(thumbnailSaveDirAbsolute);
                } catch (err) {
                    fs.mkdirSync(thumbnailSaveDirAbsolute);
                }
                if (stat && !stat.isDirectory()) {
                    throw new Error('Directory cannot be created because an inode of a different type exists at "' + thumbnailSaveDirAbsolute + '"');
            }

            var itemType = "";

            //Create a thumbnail for images only
            if (mimetype && extname) {

                thumbnailSavePathRelative = UPLOADS_DIR_RELATIVE + req.body.userIdentifier + "/Thumbnails/" + req.file.filename;
                createImageThumbnail(savePathAbsolute, thumbnailSavePathAbsolute, THUMBANAIL_WIDTH, THUMBNAIL_HEIGHT);
                itemType = "image";
            }else{
                var thumbnailName = req.file.fieldname + '-' + Date.now()+ '.' + '.png';
                thumbnailSavePathRelative = UPLOADS_DIR_RELATIVE + req.body.userIdentifier + "/Thumbnails/" + thumbnailName;
                createVideoThumbnail(savePathAbsolute, thumbnailSaveDirAbsolute, thumbnailName, THUMBANAIL_WIDTH, THUMBNAIL_HEIGHT);
                // createVideoThumbnail(inputPath, outputDir, fileName, width, height){
                itemType = "video";
            }


            /**
             * Create the corresponding snap model item
             */
            // console.log(util.inspect(req.file, {showHidden: false, depth: null}));
            

            var album = {};

            if(typeof req.body.album._id !== 'undefined'){

                var postedAlbum = JSON.parse(req.body.album);

                if(typeof postedAlbum._id !== 'undefined'){
                    
                    album = {
                        "name" : postedAlbum.name,
                        "description" : postedAlbum.description,
                        "address" : postedAlbum.address,
                        "_id" : postedAlbum._id,
                    };
                }
            }

            var snap = new Snap({
                "name" : req.body.name,
                "description" : req.body.description,
                "type" : itemType,
                "originalname" : req.file.originalname,
                "fileName" : req.file.filename,
                "path" : savePathRelative,
                "mime" : req.file.mimetype,
                "size" : req.file.size,
                "thumbnailPath" : thumbnailSavePathRelative,
                "originalPath" : savePathRelative,
                "featured" : req.body.featured,
                "publicSnap" : req.body.publicSnap,
                "album" : album
                
            });
            
            snap.save((err, resource) => {
                if(err) res.send(err).status(501);
                else{
                    //use id to find a 

                    // console.log(util.inspect(resource, {showHidden: false, depth: null}));
                    res.json(resource).status(201); //201 HTML code for created
                } 
            });
        });   
    };
};

//http://sharp.dimens.io/en/stable/api-resize/
//http://www.rapidtables.com/web/color/white-color.htm Colors
function createImageThumbnail(inputPath, outputPath, width, height){
     sharp(inputPath)
            .resize(width, height)
            .background({r: 245, g: 245, b: 245, alpha: 100}) //THis is a black background
            .embed()
            .toFormat(sharp.format.webp)
            // .max()
            // .withoutEnlargement(true)
            .toFile(outputPath, function(err) {
                // output.jpg is a 200 pixels wide and 200 pixels high image
                // containing a scaled and cropped version of input.jpg
        });
};

function createVideoThumbnail(inputPath, outputDir, fileName, width, height){

    ffmpeg(inputPath)
    .screenshots({
        timestamps: ['50%'],
        filename: fileName,
        folder: outputDir,
        size: width+'x'+height
        // size: '320x240'
    })
    .on('error', function(err, stdout, stderr) {
        return false;
    })
    .on('end', function(stdout, stderr) {
        if (compositeThumbnail(outputDir + fileName)) return true;
    });

    
    
};

//ffmpeg https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
function compositeThumbnail(inputPath){

    sharp(inputPath)
        .overlayWith(PRESS_PLAY, { gravity: sharp.gravity.centre } )
        // .quality(90)
        // .webp()
        .toBuffer()
        .then(function(outputBuffer) {

            return true;
    });
};

exports.deleteSnap = (req, res, err) => {
    var id = req.params.id;
    Snap.remove({_id : id}, (err, resource) => {
        if(err) res.send(err).status(501);
        else res.send(resource).status(200);
    });
    //remove snap from the Directory
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

            console.log(util.inspect(req.body, {showHidden: false, depth: null}));
            
            foundSnap.name = req.body.snap.name || foundSnap.name;
            foundSnap.description = req.body.snap.description || foundSnap.description;
            foundSnap.album = req.body.snap.album || foundSnap.album;
            foundSnap.type = req.body.snap.type || foundSnap.type;
            foundSnap.featured = req.body.snap.featured;
            foundSnap.publicSnap = req.body.snap.publicSnap;

            foundSnap.save((err, resource) => {
                if(err) res.send(err).status(501);
                else res.json(resource).status(200); //200 HTML code for success
            });
            
        }
    });
};


function resizeImage(inputPath, width, height) {  
  // create the resize transform
//   var resizeTransform = sharp().resize(width, height).max();
//   return new Promise((resolve, reject) => {
//     // determine wether we need to use `http` or `https` libs
//     var httpLib = http;
//     if ( /^https/.test(imageUri) ) {
//       httpLib = https;
//     }
//     // begin reading the image
    
//     //   var outPath = `./output-${ width }x${ height }.jpg`;
      
//       var writeStream = fs.createWriteStream(outPath);
//       downloadStream.pipe(resizeTransform).pipe(writeStream);
//       downloadStream.on('end', () => resolve(outPath));
//       writeStream.on('error', reject);
//       downloadStream.on('error', reject);
//       resizeTransform.on('error', reject);
    
//   });

    // var outPutPath = 


    // var newDestination = DIR + req.body.userIdentifier + "/";
    //     var stat = null;
    //     try {
    //         stat = fs.statSync(newDestination);
    //     } catch (err) {
    //         fs.mkdirSync(newDestination);
    //     }
    //     if (stat && !stat.isDirectory()) {
    //         throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
    //     }       
    //     cb(null, newDestination);
    // },
    // filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now()+ '.' + mime.extension(file.mimetype))

    

}