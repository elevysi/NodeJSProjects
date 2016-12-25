const PORT = 8000 || process.env.PORT;
var mainRouter= require('./routes/index');
var apiRouter = require('./routes/api')
var DB = "mongodb://localhost/meantuto";
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');


var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(DB, (err) => {
    if(err) return err;
    else console.log("Successfully connected to " + DB);
});

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "client")));


app.use('/', mainRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log("Listenning on port " + PORT);
});

