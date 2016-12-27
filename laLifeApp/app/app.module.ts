import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from "./app-routing.module";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppComponent }  from './app.component';
import { SnapsComponent } from './snaps.component';
import { AddSnapComponent } from "./add-snap.component";
import { ViewSnapComponent } from "./view-snap.component";

import { SnapService } from './snap.service';

// import './rxjs-extensions';

@NgModule({
  imports: [ 
      BrowserModule,
      HttpModule,
      FormsModule,
      AppRoutingModule
    ],
  declarations: [ 
    AppComponent,
    SnapsComponent,
    AddSnapComponent,
    ViewSnapComponent
  ],
  providers : [ SnapService],
  bootstrap: [ AppComponent ]
  
})
export class AppModule { }
