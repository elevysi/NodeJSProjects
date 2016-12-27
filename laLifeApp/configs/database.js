var mongoose = require("mongoose");
const DB = "mongodb://localhost/lalifedb";

module.exports.dbConnect = () => {
    mongoose.connect(DB, (err) => {
        if(err){
            console.log("Failed to connect to DB");
            return;
        } 
        else console.log("Successfuly connected to DB "+DB);
    });
};