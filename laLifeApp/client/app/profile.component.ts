import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Component({
    moduleId : module.id,
    selector : "<app-profile></app-profile>",
    templateUrl : "profile.component.html"
})

export class ProfileComponent implements OnInit{

    constructor(
        private userService : UserService,
        private authService : AuthService
    ){

    }

    ngOnInit() : void {

    }
}