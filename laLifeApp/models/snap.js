var mongoose = require("mongoose");

module.exports = mongoose.model("Snap", {
    name : "String",
    description : "String",
    path : "String",
    created : {type: Date, default: Date.now}
});