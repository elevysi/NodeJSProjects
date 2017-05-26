"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require('@angular/common');
var snap_service_1 = require("../_services/snap.service");
var authentication_service_1 = require("../_services/authentication.service");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
require("rxjs/add/operator/switchMap");
var FileUploadComponent = (function () {
    function FileUploadComponent(snapService, router, location, authenticationService) {
        this.snapService = snapService;
        this.router = router;
        this.location = location;
        this.authenticationService = authenticationService;
        this.snapUrl = "api/snaps";
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: this.snapUrl,
            headers: [
                {
                    name: 'Authorization',
                    value: 'Bearer ' + localStorage.getItem('auth_token')
                }
            ]
        });
    }
    FileUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.getUser().subscribe(function (userObservabble) {
            _this.user = userObservabble;
        });
    };
    FileUploadComponent.prototype.addSnap = function () {
        var _this = this;
        var snap = {
            _id: null,
            name: this.name,
            description: this.description,
            path: this.path
        };
        this.snapService.addSnap(snap)
            .then(function () { return _this.goBack(); });
        // console.log(snap);
    };
    FileUploadComponent.prototype.goBack = function () {
        this.location.back();
    };
    FileUploadComponent.prototype.fileSubmit = function () {
        this.appendToFile();
        this.uploader.uploadAll();
    };
    FileUploadComponent.prototype.appendToFile = function () {
        var _this = this;
        this.uploader.onBuildItemForm = function (item, form) {
            form.append("name", _this.name);
            form.append("description", _this.description);
            // console.log("logged user is "+ this.user.);
            form.append("userIdentifier", _this.user.email);
        };
    };
    FileUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "<file-upload></file-upload>",
            templateUrl: "file-upload.component.html"
        }), 
        __metadata('design:paramtypes', [snap_service_1.SnapService, router_1.Router, common_1.Location, authentication_service_1.AuthenticationService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map