// module.exports.setConfigs = function(){
//     process.env.MONGO_CONNECTION = "";
//     process.env.CLOUDINARY_URL = "";
// }

var mongoose = require('mongoose');
const DB = "mongodb://localhost/meantuto";

exports.dbConnect = () => {
    mongoose.connect(DB, (err) => {
        if(err) return err;
        else console.log("Successfully connected to mongo " + DB);
    });
};