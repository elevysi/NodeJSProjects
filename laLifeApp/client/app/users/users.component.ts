import { Component, OnInit } from "@angular/core";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Component({
    moduleId : module.id,
    selector : "<app-profile></app-profile>",
    templateUrl : "users.component.html"
})

export class UsersComponent implements OnInit{
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