import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";

import { User } from "../_models/user";

@Component({
    moduleId : module.id,
    selector : "<app-register></app-register>",
    templateUrl : "register.component.html",
    styleUrls : ["../../assets/css/pages/page_log_reg_v2.css"]
})

export class RegisterComponent{

    model: any = {};

    email : String;
    password : String;
    name : String;
    loading : false;

    constructor(
        private userService : UserService,
        private router : Router,
        private alertService : AlertService
    ){

    }

    submit() : void {
          
         var user  : User = {
            firstName : this.model.firstName,
            lastName : this.model.lastName,
            email : this.model.email,
            password : this.model.password,
            username : this.model.username,
            bio : this.model.bio
        };


        this.userService.registerUser(user)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('The registration was successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

}