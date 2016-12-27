var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

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

//Set static folder
app.use(express.static(path.join(__dirname, "")));

app.use("/", appRoute);
app.get("/api/snaps", apiRoute.list);
app.get("/api/snaps/:id", apiRoute.getSnap);
app.post("/api/snaps", apiRoute.add);
app.delete("/api/snaps/:id", apiRoute.deleteSnap);

// app.get("/", (err, req, res) => {
//     if(err) return;
//     else res.sendFile(__dirname + "/index.html");
// });

const PORT = process.env.port || 9090;
app.listen(PORT, () => {
    console.log("Running on the port " +PORT);
});