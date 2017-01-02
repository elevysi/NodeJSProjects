import { Component, OnInit } from "@angular/core";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Component({
    moduleId : module.id,
    selector : "<app-profile></app-profile>",
    templateUrl : "profile.component.html"
})

export class ProfileComponent implements OnInit{
    users : User[];
    constructor(
        private userService : UserService
    ){

    }

    ngOnInit() : void {

        this.userService.getUsers()
            .then((users) => {
                if(users){
                   this.users = users; 
                }
            });

    }
}