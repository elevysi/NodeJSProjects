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
require("rxjs/add/operator/switchMap");
var snap_1 = require("./snap");
var snap_service_1 = require("./snap.service");
var ViewSnapComponent = (function () {
    function ViewSnapComponent(snapService, route) {
        this.snapService = snapService;
        this.route = route;
    }
    ViewSnapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.snapService.getSnap(params['id']); })
            .subscribe(function (snap) { return _this.snap = snap; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', snap_1.Snap)
    ], ViewSnapComponent.prototype, "snap", void 0);
    ViewSnapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "view-snap",
            templateUrl: "view-snap.component.html"
        }), 
        __metadata('design:paramtypes', [snap_service_1.SnapService, router_1.ActivatedRoute])
    ], ViewSnapComponent);
    return ViewSnapComponent;
}());
exports.ViewSnapComponent = ViewSnapComponent;
//# sourceMappingURL=view-snap.component.js.map