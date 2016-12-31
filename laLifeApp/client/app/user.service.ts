import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";


import 'rxjs/add/operator/toPromise';

import { User } from "./user";

@Injectable()
export class UserService{

    private userUrl = "api/users";
    private loginUrl = "api/login";
    private registerUrl = "api/register";
    private loggedIn = false;

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    
    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }

    getProfile(id : String): Promise<User> {
        const url = `${this.userUrl}/${id}`;
        console.log("I am called in auth service");
        return this.http.get(url)
            .toPromise()
            .then(response => {
                   var user : User = response.json();
                   return user;
            })
            .catch(this.handleError);
    }

    getUsers(): Promise<User[]> {
        const url = `${this.userUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        // this.headers = this.headers.append('Authorization', `Bearer ${authToken}`);
        
        return this.http.get(this.userUrl, {headers: headers})
            .toPromise()
            .then(response => response.json() as User[])
            .catch(this.handleError);
    }

    login(email : String, password : String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http
            .post(this.loginUrl, JSON.stringify({ email, password }), {headers: this.headers})
            .toPromise()
            .then(res => {
                var data = res.json();
                console.log("Success is ", data['success']);
                if (data['success']) {
                    this.storeToken(data['token']);
                    return this.isLoggedIn;
                }

                // return res.json().success;
            })
            .catch(this.handleError);

  }

  storeToken(auth_token : string) {
      localStorage.setItem('auth_token', auth_token);
        this.loggedIn = true;
  }

  getToken() {
      return localStorage.getItem('auth_token');
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

//   isLoggedIn() {
//     return this.loggedIn;
//   }

  isLoggedIn() : boolean {
    var token = this.getToken();
    if(token){
        var payload = token.split('.')[1];
        payload = atob(payload);
        console.log(JSON.parse(payload).exp);

        return JSON.parse(payload).exp > Date.now() / 1000;
    } else {
        return false;
    }
}

    currentUser(){
        if(this.isLoggedIn()){
            var token = this.getToken();
            var payload = token.split('.')[1];
            payload = atob(payload);
            return {
                email : JSON.parse(payload).email,
                name : JSON.parse(payload).name
            };
        }

        return false;
    }

  register(name : String, email : String, password : String) {
        
        return this.http
            // .post(this.snapUrl, JSON.stringify({snap : snap}), {headers: this.headers})
            .post(this.registerUrl, JSON.stringify({name, email, password }), {headers: this.headers})
            .toPromise()
            .then(res => {
                var data = res.json();
                this.storeToken(data['token']);

                return data['success'];
            })
            .catch(this.handleError);
    }

    
}