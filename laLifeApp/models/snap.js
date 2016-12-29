var mongoose = require("mongoose");

module.exports = mongoose.model("Snap", {
    name : "String",
    description : "String",
    address : {name : "String", postcode : "String"},
    originalname : "String",
    fileName : "String",
    path : "String",
    mime : "String",
    size : "number",
    created : {type: Date, default: Date.now}
});