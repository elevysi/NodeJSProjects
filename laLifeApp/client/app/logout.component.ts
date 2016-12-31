import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "./user.service";
@Component({
    moduleId : module.id,
    selector : "<app-logout></app-logout>",
    template : ``
})

export class LogoutComponent implements OnInit{


    constructor(
        private userService : UserService,
        private router : Router
    ){

    }

    ngOnInit(): void {
        console.log("logging out this user");
        this.userService.logout();
        this.router.navigate(['']);       
    }
}