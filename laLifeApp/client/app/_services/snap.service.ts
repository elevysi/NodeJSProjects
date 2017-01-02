import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";

import 'rxjs/add/operator/toPromise';

import { Snap } from "../_models/snap";

@Injectable()
export class SnapService{

    private snapUrl = "api/snaps";
    private snapSearchUrl = "api/snapSearch";

    private headers = new Headers({'Content-Type': 'application/json'});
    // public uploader : FileUploader = new FileUploader({url: this.snapUrl});

    constructor(private http: Http){}
    
    // getSnaps(): Promise<Snap[]>{
    //     return Promise.resolve(SNAPS);
    // }

    getSnaps(): Promise<Snap[]>{
        return this.http.get(this.snapUrl)
            .toPromise()
            .then(response => response.json() as Snap[])
            .catch(this.handleError);
    }

    addSnap(snap : Snap): Promise<Snap>{
        
        return this.http
            // .post(this.snapUrl, JSON.stringify({snap : snap}), {headers: this.headers})
            .post(this.snapUrl, JSON.stringify({snap : snap}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }

    deleteSnap(id : String) : Promise<void> {
        const url = `${this.snapUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getSnap(id : String): Promise<Snap> {
        const url = `${this.snapUrl}/${id}`;
        console.log("I am called in snap service");
        return this.http.get(url)
            .toPromise()
            .then(response => {
                   var snap : Snap = response.json();
                   return snap;
            })
            .catch(this.handleError);
    }

    search(term : string): Observable<Snap[]> {
        return this.http
            .get(`${this.snapSearchUrl}/?term=${term}`)
            .map((r: Response) => r.json().data as Snap[]);
    }
    
}

