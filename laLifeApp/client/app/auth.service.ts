import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { User } from "./user";

@Injectable()
export class AuthService{

    private userUrl = "api/snaps";

    private headers = new Headers({'Content-Type': 'application/json'});
    // public uploader : FileUploader = new FileUploader({url: this.snapUrl});

    constructor(private http: Http){}
    
    // getSnaps(): Promise<Snap[]>{
    //     return Promise.resolve(SNAPS);
    // }

    

    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }

}

