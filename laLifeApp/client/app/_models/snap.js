"use strict";
var Snap = (function () {
    // name : string;
    // description : string;
    // path? : string;
    function Snap(name, description, thumbnailPath, originalPath, _id, album) {
        this.name = name;
        this.description = description;
        this.thumbnailPath = thumbnailPath;
        this.originalPath = originalPath;
        this._id = _id;
        this.album = album;
    }
    return Snap;
}());
exports.Snap = Snap;
//# sourceMappingURL=snap.js.map