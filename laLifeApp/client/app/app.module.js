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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require("./app-routing.module");
// import ng2-bootstrap alerts module
// import { AlertModule } from "ng2-bootstrap/ng2-bootstrap";
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var app_component_1 = require('./app.component');
var snaps_component_1 = require('./snaps.component');
var add_snap_component_1 = require("./add-snap.component");
var view_snap_component_1 = require("./view-snap.component");
var file_upload_component_1 = require('./file-upload.component');
var register_component_1 = require('./register.component');
var login_component_1 = require('./login.component');
var profile_component_1 = require('./profile.component');
var users_component_1 = require("./users.component");
var logout_component_1 = require("./logout.component");
// import 
var snap_service_1 = require('./snap.service');
var user_service_1 = require('./user.service');
var logged_in_guard_1 = require("./logged-in.guard");
// import './rxjs-extensions';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                snaps_component_1.SnapsComponent,
                add_snap_component_1.AddSnapComponent,
                view_snap_component_1.ViewSnapComponent,
                ng2_file_upload_1.FileSelectDirective,
                file_upload_component_1.FileUploadComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                profile_component_1.ProfileComponent,
                logout_component_1.LogoutComponent,
                users_component_1.UsersComponent
            ],
            providers: [snap_service_1.SnapService, user_service_1.UserService, logged_in_guard_1.LoggedInGuard],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map