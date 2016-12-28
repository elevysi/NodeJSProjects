var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var fs = require('fs');

var multiparty = require('connect-multiparty'); //For files uploads

var appHeaders = require('./middleware/appheaders');


const appRoute = require("./routes/app");
var apiRoute = require("./routes/api");

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
app.use(express.static(path.join(__dirname, "")));
//Folder for files uploads
app.set('uploadsDir', path.join(__dirname, 'uploads'));

// var upload = multer({dest : app.get('uploadsDir')});



app.use("/", appRoute);
app.get("/api/snaps", apiRoute.list);
app.get("/api/snaps/:id", apiRoute.getSnap);
app.post("/api/snaps", apiRoute.add(app.get('uploadsDir')));

// app.post('/api/snaps', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end(err.toString());
//     }

//     res.end('File is uploaded');
//   });
// });


app.delete("/api/snaps/:id", apiRoute.deleteSnap);

// app.get("/", (err, req, res) => {
//     if(err) return;
//     else res.sendFile(__dirname + "/index.html");
// });

const PORT = process.env.port || 9090;
app.listen(PORT, () => {
    console.log("Running on the port " +PORT);
});