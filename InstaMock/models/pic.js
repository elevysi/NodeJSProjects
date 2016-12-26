var mongoose = require("mongoose");

module.exports = mongoose.model("Pic", {
    name : "String",
    path : "String",
    created: {type: Date, default: Date.now}
});