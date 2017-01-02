import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";

@Component({
    moduleId : module.id,
    selector : "<app-register></app-register>",
    templateUrl : "register.component.html",
    styleUrls : ["../../assets/css/pages/page_log_reg_v2.css"]
})

export class RegisterComponent{

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
        this.userService.create(this.name, this.email, this.password)
            .subscribe(
                data => {
                    console.log(data);
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

}