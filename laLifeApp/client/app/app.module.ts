import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from "./app-routing.module";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";

// import ng2-bootstrap alerts module
// import { AlertModule } from "ng2-bootstrap/ng2-bootstrap";

import { FileSelectDirective, FileDropDirective } from "ng2-file-upload/ng2-file-upload";

import { AppComponent }  from './app.component';
import { SnapsComponent } from './snaps/snaps.component';
import { AddSnapComponent } from "./addSnap/add-snap.component";
import { ViewSnapComponent } from "./viewSnap/view-snap.component";
import { FileUploadComponent } from './fileUpload/file-upload.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from "./users/users.component";
import { LogoutComponent } from "./logout/logout.component";

import { AlertComponent } from "./_directives/alert.component";
import { ErrorComponent } from "./error/error.component";
import { CubePortfolioComponent } from "./_directives/cube.portfolio.component";

// import 

import { SnapService } from './_services/snap.service';
import { AlertService } from "./_services/alert.service";
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { LoggedInGuard } from "./_guards/logged-in.guard";


// import './rxjs-extensions';

@NgModule({
  imports: [ 
      BrowserModule,
      HttpModule,
      FormsModule,
      AppRoutingModule
      // AlertModule
    ],
  declarations: [ 
    AppComponent,
    SnapsComponent,
    AddSnapComponent,
    ViewSnapComponent,
    FileSelectDirective,
    FileUploadComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    UsersComponent,
    AlertComponent,
    ErrorComponent,
    CubePortfolioComponent
  ],
  providers : [ LoggedInGuard, SnapService, UserService, AlertService, AuthenticationService],
  bootstrap: [ AppComponent ]
  
})
export class AppModule { }
