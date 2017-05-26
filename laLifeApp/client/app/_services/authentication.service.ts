import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { User } from "../_models/user";
 
@Injectable()
export class AuthenticationService{

    private loggedIn = false;
    private loginUrl = "api/login";
    private headers = new Headers({'Content-Type': 'application/json'});


    //https://www.lucidchart.com/techblog/2016/11/08/angular-2-and-observables-data-sharing-in-a-multi-view-application/
    // private user$ = new BehaviorSubject(User);

    private user : BehaviorSubject<any> = new BehaviorSubject(null);
    

    // user$ = this.user.asObservable();

    getUser() : Observable<User>{
        return this.user.asObservable();
    }

    constructor(private http: Http) { this.init(); }

    /**
     * OnInit not possible for injectables
     * http://stackoverflow.com/questions/35110690/ngoninit-not-being-called-when-injectable-class-is-instantiated
     */
    init() : void {
        /**
         * See if there is no logged in user
         */
        this.setCurrentUser();
    }
 
    login(email: string, password: string) {
        return this.http.post(this.loginUrl, JSON.stringify({ email, password }), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response

                var data = response.json();
                
                if (data['success']) {                    
                    this.storeToken(data['token']);
                    this.setCurrentUser();
                    return this.isLoggedIn;
                }

            });
    }

    setCurrentUser(){
        /**
         * Set the current user
         */
        var _currentUser = this.currentUser();
        
        if(_currentUser.email === null){
            this.user.next(null);
        }else{
            var _newUser= new User();
            _newUser.email = _currentUser.email;
            _newUser.name = _currentUser.name;

            this.user.next(_newUser);
            
        }
        
    }

    storeToken(auth_token : string) {
        localStorage.setItem('auth_token', auth_token);
        this.loggedIn = true;
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }
    
    logout() : boolean{
        localStorage.removeItem('auth_token');
        this.setCurrentUser();
        this.loggedIn = false;

        return true;
    }



    isLoggedIn() : boolean {
        var token = this.getToken();
        if(token){
            var payload = token.split('.')[1];
            payload = atob(payload);
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
                name : JSON.parse(payload).name,
                success : true
            };
        }

        return {
                email : null,
                name : null,
                success : false
            }
    }

    

    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }
}