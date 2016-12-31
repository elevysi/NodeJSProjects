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
var snaps_component_1 = require("./snaps.component");
var add_snap_component_1 = require("./add-snap.component");
var view_snap_component_1 = require("./view-snap.component");
var file_upload_component_1 = require('./file-upload.component');
var register_component_1 = require('./register.component');
var login_component_1 = require('./login.component');
var profile_component_1 = require('./profile.component');
var logout_component_1 = require("./logout.component");
var users_component_1 = require("./users.component");
var logged_in_guard_1 = require("./logged-in.guard");
// import { AppComponent } from "./app.component";
var routes = [
    // {
    //     path: '',
    //     redirectTo : "/snaps",
    //     pathMatch : "full"
    // },
    // {
    //     path: 'snaps',
    //     component: SnapsComponent
    // },
    {
        path: '',
        component: snaps_component_1.SnapsComponent
    },
    {
        path: "add",
        component: add_snap_component_1.AddSnapComponent
    },
    {
        path: "upload",
        component: file_upload_component_1.FileUploadComponent
    },
    {
        path: 'view/:id',
        component: view_snap_component_1.ViewSnapComponent
    },
    {
        path: "register",
        component: register_component_1.RegisterComponent
    },
    {
        path: "login",
        component: login_component_1.LoginComponent
    },
    {
        path: 'users',
        component: users_component_1.UsersComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'profile/:email',
        component: profile_component_1.ProfileComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'logout',
        component: logout_component_1.LogoutComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map