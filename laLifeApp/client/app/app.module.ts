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
import { SnapsComponent } from './snaps.component';
import { AddSnapComponent } from "./add-snap.component";
import { ViewSnapComponent } from "./view-snap.component";
import { FileUploadComponent } from './file-upload.component';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { UsersComponent } from "./users.component";
import { LogoutComponent } from "./logout.component";

// import 

import { SnapService } from './snap.service';
import { UserService } from './user.service';
import { LoggedInGuard } from "./logged-in.guard";

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
    UsersComponent
  ],
  providers : [ SnapService, UserService, LoggedInGuard],
  bootstrap: [ AppComponent ]
  
})
export class AppModule { }
