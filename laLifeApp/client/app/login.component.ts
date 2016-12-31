import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
    moduleId : module.id,
    selector : "<app-login></app-login>",
    templateUrl : "login.component.html",
    styleUrls : ["../assets/css/pages/page_log_reg_v2.css"]
})

export class LoginComponent implements OnInit{

    email : String;
    password : String;

    constructor(
        private userService : UserService,
        private router : Router
    ){

    }

    ngOnInit() : void {
        if(this.userService.isLoggedIn()){
            console.log("User is logged in");
            this.router.navigate(['']);
        }
    }

    submit() : void {
        this.userService.login(this.email, this.password)
            .then((result) => {
                if(result){
                    this.router.navigate(['']);
                }
            });
    }

}