"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.userUrl = "api/users";
        this.loginUrl = "api/login";
        this.registerUrl = "api/register";
        this.loggedIn = false;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    UserService.prototype.handleError = function (error) {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    };
    UserService.prototype.getProfile = function (id) {
        var url = this.userUrl + "/" + id;
        console.log("I am called in auth service");
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var user = response.json();
            return user;
        })
            .catch(this.handleError);
    };
    UserService.prototype.getUsers = function () {
        var url = "" + this.userUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        // this.headers = this.headers.append('Authorization', `Bearer ${authToken}`);
        return this.http.get(this.userUrl, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (email, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.loginUrl, JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var data = res.json();
            console.log("Success is ", data['success']);
            if (data['success']) {
                _this.storeToken(data['token']);
                return _this.isLoggedIn;
            }
            // return res.json().success;
        })
            .catch(this.handleError);
    };
    UserService.prototype.storeToken = function (auth_token) {
        localStorage.setItem('auth_token', auth_token);
        this.loggedIn = true;
    };
    UserService.prototype.getToken = function () {
        return localStorage.getItem('auth_token');
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    };
    //   isLoggedIn() {
    //     return this.loggedIn;
    //   }
    UserService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        if (token) {
            var payload = token.split('.')[1];
            payload = atob(payload);
            console.log(JSON.parse(payload).exp);
            return JSON.parse(payload).exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    UserService.prototype.currentUser = function () {
        if (this.isLoggedIn()) {
            var token = this.getToken();
            var payload = token.split('.')[1];
            payload = atob(payload);
            return {
                email: JSON.parse(payload).email,
                name: JSON.parse(payload).name
            };
        }
        return false;
    };
    UserService.prototype.register = function (name, email, password) {
        var _this = this;
        return this.http
            .post(this.registerUrl, JSON.stringify({ name: name, email: email, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var data = res.json();
            _this.storeToken(data['token']);
            return data['success'];
        })
            .catch(this.handleError);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map