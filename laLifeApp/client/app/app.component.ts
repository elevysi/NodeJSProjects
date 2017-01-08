import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import {Subscription} from 'rxjs/Subscription';

import {User} from "./_models/user";
import { AuthenticationService } from "./_services/authentication.service";



@Component({
  moduleId : module.id,
  selector: 'my-app',
  templateUrl : "app.component.html",
})
export class AppComponent  implements OnInit{ 
  name = 'LaLifeApp';
  user : User;
  subscription : Subscription;

  constructor(
    private authenticationService : AuthenticationService
  ){

  }

  ngOnInit() : void {
    
      this.subscription = this.authenticationService.user$
        .subscribe(user => {this.user = user; console.log("I am receiving the user");});

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }


}
