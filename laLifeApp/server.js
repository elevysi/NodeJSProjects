var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var fs = require('fs');

var passport = require('passport');

var multiparty = require('connect-multiparty'); //For files uploads

var appHeaders = require('./middleware/appheaders');

require('./models/user');
require('./configs/passport');

//For getting the secret
var configs = require("./configs/secret");

var jwt = require('express-jwt');
var auth = jwt({
  secret: configs.getSecret(),
  userProperty: 'payload'
});


const appRoute = require("./routes/app");
var apiRoute = require("./routes/api");
var usersRoute = require("./routes/users");

//Connects to Mongo
const dbConfig = require("./configs/database");
dbConfig.dbConnect(); 

var app = express ();


//View Engine
app.set("views", __dirname);
app.set('view engine', "ejs");
app.engine("html", require('ejs').renderFile);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// app.use(coo)

app.use(appHeaders);

//Set static folder
app.use(express.static(path.join(__dirname, "client")));
//Folder for files uploads
app.set('uploadsDir', path.join(__dirname, 'uploads'));

// var upload = multer({dest : app.get('uploadsDir')});


app.use(passport.initialize())



app.use("/", appRoute);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


app.get("/api/snaps", apiRoute.list);
app.get("/api/snaps/:id", apiRoute.getSnap);
app.post("/api/snaps", apiRoute.add(app.get('uploadsDir')));

app.post("/api/register", usersRoute.register);
app.post("/api/login", usersRoute.login);
app.get("/api/profile", auth, usersRoute.profileRead);
app.get("/api/users", auth, usersRoute.list);


app.delete("/api/snaps/:id", apiRoute.deleteSnap);

// app.get("/", (err, req, res) => {
//     if(err) return;
//     else res.sendFile(__dirname + "/index.html");
// });

const PORT = process.env.port || 9090;
app.listen(PORT, () => {
    console.log("Running on the port " +PORT);
});