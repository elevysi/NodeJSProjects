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
var snaps_component_1 = require('./snaps/snaps.component');
var add_snap_component_1 = require("./addSnap/add-snap.component");
var view_snap_component_1 = require("./viewSnap/view-snap.component");
var edit_snap_component_1 = require("./editSnap/edit-snap.component");
var file_upload_component_1 = require('./fileUpload/file-upload.component');
var albums_component_1 = require('./albums/albums.component');
var add_album_component_1 = require("./addAlbum/add-album.component");
var view_album_component_1 = require("./viewAlbum/view-album.component");
var edit_album_component_1 = require("./editAlbum/edit-album.component");
var register_component_1 = require('./register/register.component');
var login_component_1 = require('./login/login.component');
var profile_component_1 = require('./profile/profile.component');
var users_component_1 = require("./users/users.component");
var logout_component_1 = require("./logout/logout.component");
var alert_component_1 = require("./_directives/alert.component");
var error_component_1 = require("./error/error.component");
var cube_portfolio_component_1 = require("./_directives/cube.portfolio.component");
var snap_service_1 = require('./_services/snap.service');
var alert_service_1 = require("./_services/alert.service");
var authentication_service_1 = require('./_services/authentication.service');
var user_service_1 = require('./_services/user.service');
var album_service_1 = require('./_services/album.service');
var logged_in_guard_1 = require("./_guards/logged-in.guard");
var validation_service_1 = require('./_services/validation-service');
var control_messages_component_1 = require('./_directives/control-messages.component');
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
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                snaps_component_1.SnapsComponent,
                add_snap_component_1.AddSnapComponent,
                view_snap_component_1.ViewSnapComponent,
                edit_snap_component_1.EditSnapComponent,
                ng2_file_upload_1.FileSelectDirective,
                file_upload_component_1.FileUploadComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                profile_component_1.ProfileComponent,
                logout_component_1.LogoutComponent,
                users_component_1.UsersComponent,
                alert_component_1.AlertComponent,
                error_component_1.ErrorComponent,
                cube_portfolio_component_1.CubePortfolioComponent,
                albums_component_1.AlbumsComponent,
                add_album_component_1.AddAlbumComponent,
                edit_album_component_1.EditAlbumComponent,
                view_album_component_1.ViewAlbumComponent,
                control_messages_component_1.ControlMessagesComponent
            ],
            providers: [logged_in_guard_1.LoggedInGuard, snap_service_1.SnapService, user_service_1.UserService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, album_service_1.AlbumService, validation_service_1.ValidationService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map