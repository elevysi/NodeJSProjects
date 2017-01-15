var mongoose = require("mongoose");

// module.exports = mongoose.model("Snap", {
//     name : "String",
//     description : "String",
//     address : {name : "String", postcode : "String"},
//     originalname : "String",
//     fileName : "String",
//     path : "String",
//     mime : "String",
//     size : "number",
//     created : {type: Date, default: Date.now}
// });

var snapSchema = new mongoose.Schema({
    // _id: Number,
    name: {
        type: String,
        required: true
    },
    description : "String",
    address : {name : "String", postcode : "String"},
    originalname : "String",
    fileName : "String",
    path : "String",
    mime : "String",
    size : "number",
    created : {type: Date, default: Date.now}  
});

module.exports = mongoose.model('Snap', snapSchema);