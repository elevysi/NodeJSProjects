import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
    moduleId : module.id,
    selector : "<app-register></app-register>",
    templateUrl : "register.component.html",
    styleUrls : ["../assets/css/pages/page_log_reg_v2.css"]
})

export class RegisterComponent{

    email : String;
    password : String;
    name : String;

    constructor(
        private userService : UserService,
        private router : Router
    ){

    }

    submit() : void {
        this.userService.register(this.name, this.email, this.password)
            .then((result) => {
                if(result){
                    this.router.navigate(['']);
                }
            });
    }

}