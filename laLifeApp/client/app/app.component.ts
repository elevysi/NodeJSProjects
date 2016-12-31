import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import {User} from "./user";
import { UserService } from "./user.service";


@Component({
  moduleId : module.id,
  selector: 'my-app',
  templateUrl : "app.component.html",
})
export class AppComponent  implements OnInit{ 
  name = 'LaLifeApp';
  user : User;

  constructor(
    private userService : UserService
  ){

  }

  ngOnInit() : void {

    // this.userService.currentUser().subscribe(currentUser => {
    //     var user  : User = {
    //         name : currentUser.name,
    //         email : currentUser.email,
    //         id : "",
    //         password : ""
    //     };
    //   });

      var currentUser = this.userService.currentUser();
      if(currentUser){
        var user  : User = {
            name : currentUser.name,
            email : currentUser.email,
            id : "",
            password : ""
        };

        this.user = user;
      }

  }


}
