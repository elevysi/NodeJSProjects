var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var fs = require('fs');
var sharp = require("sharp");

var passport = require('passport');

var multiparty = require('connect-multiparty'); //For files uploads

require('./models/user');
require('./configs/passport');

//For getting the secret
var configs = require("./configs/secret");

var jwt = require('express-jwt');
var auth = jwt({
  secret: configs.getSecret(),
  userProperty: 'payload'
});


const appRoute = require("./routes/app"); // This route redirects all other requests to angular's index
var apiRoute = require("./routes/api");
var usersRoute = require("./routes/users");
var snapRoute = require("./routes/snap");

//Connects to Mongo
const dbConfig = require("./configs/database");
dbConfig.dbConnect(); 

var app = express ();


//View Engine
// app.set("views", __dirname);
app.set('views', path.join(__dirname, 'views')); //so that all is given to angular
app.set('view engine', "ejs");
app.engine("html", require('ejs').renderFile);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Set static folder, since there is an index file it will be rendered automatically
app.use(express.static(path.join(__dirname, "client")));
//Folder for files uploads
app.set('uploadsDir', path.join(__dirname, 'uploads'));

// var upload = multer({dest : app.get('uploadsDir')});


app.use(passport.initialize())


//Snaps
app.get("/api/snaps", apiRoute.list);
app.get("/api/snapSearch", apiRoute.search);
app.get("/api/snaps/:id", apiRoute.getSnap);
app.put("/api/snaps/:id", auth, apiRoute.editSnap);
app.post("/api/snaps", auth, apiRoute.add(app.get('uploadsDir')));
app.delete("/api/snaps/:id", auth, apiRoute.deleteSnap);

//Users
app.post("/api/register", usersRoute.register); //only i can register users
// app.post("/api/register", usersRoute.register);
app.post("/api/login", usersRoute.login);
app.get("/api/profile", auth, usersRoute.profileRead);
app.get("/api/users", auth, usersRoute.list);
app.get("/api/snap/:id", snapRoute.snap);

app.get('/*', appRoute.index); // This route redirects all other requests to angular's index


const PORT = process.env.port || 9090;
app.listen(PORT, () => {
    console.log("Running on the port " +PORT);
});