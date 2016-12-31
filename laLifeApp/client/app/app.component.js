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
var core_1 = require('@angular/core');
var user_service_1 = require("./user.service");
var AppComponent = (function () {
    function AppComponent(userService) {
        this.userService = userService;
        this.name = 'LaLifeApp';
    }
    AppComponent.prototype.ngOnInit = function () {
        // this.userService.currentUser().subscribe(currentUser => {
        //     var user  : User = {
        //         name : currentUser.name,
        //         email : currentUser.email,
        //         id : "",
        //         password : ""
        //     };
        //   });
        var currentUser = this.userService.currentUser();
        if (currentUser) {
            var user = {
                name: currentUser.name,
                email: currentUser.email,
                id: "",
                password: ""
            };
            this.user = user;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map