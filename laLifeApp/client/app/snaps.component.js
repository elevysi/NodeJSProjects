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
var common_1 = require("@angular/common");
var snap_service_1 = require("./snap.service");
var SnapsComponent = (function () {
    function SnapsComponent(snapService, router, location) {
        this.snapService = snapService;
        this.router = router;
        this.location = location;
        this.snaps = [];
    }
    ;
    SnapsComponent.prototype.getSnaps = function () {
        var _this = this;
        this.snapService.getSnaps()
            .then(function (snaps) {
            _this.snaps = snaps;
            _this.rows = Array.from(Array(Math.ceil(_this.snaps.length / 3)).keys());
            // console.log(this.rows);
        });
    };
    SnapsComponent.prototype.ngOnInit = function () {
        this.getSnaps();
    };
    SnapsComponent.prototype.deleteSnap = function (id) {
        var _this = this;
        this.snapService.deleteSnap(id)
            .then(function () {
            // this.goBack();
            _this.router.navigateByUrl("/");
        });
    };
    SnapsComponent.prototype.goBack = function () {
        this.location.back();
    };
    SnapsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "lalifeapp",
            templateUrl: 'snaps.component.html'
        }), 
        __metadata('design:paramtypes', [snap_service_1.SnapService, router_1.Router, common_1.Location])
    ], SnapsComponent);
    return SnapsComponent;
}());
exports.SnapsComponent = SnapsComponent;
//# sourceMappingURL=snaps.component.js.map