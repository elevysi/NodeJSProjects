import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { Headers } from "@angular/http";
import {Subscription} from "rxjs/Subscription";

import { Snap } from "../_models/snap";
import { User } from "../_models/user";
import { Album } from "../_models/album";

import { SnapService } from "../_services/snap.service";
import { AlbumService } from "../_services/album.service";
import { AuthenticationService } from "../_services/authentication.service";


import { FileUploader } from "ng2-file-upload/ng2-file-upload";

import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/switchMap";

@Component({
    moduleId : module.id,
    selector : "<file-upload></file-upload>",
    templateUrl : "file-upload.component.html"
})

export class FileUploadComponent implements OnInit{

    private snapUrl = "api/snaps";
    snap : Snap;
    albums : Album [];
    private user : User;


    name : string;
    description : string;
    path : string;
    album : Album;
    type : string;

    public uploader : FileUploader = new FileUploader({
        url: this.snapUrl,
        headers: [
                {
                    name:'Authorization',
                    value:'Bearer '+localStorage.getItem('auth_token')
                }
            ]
    });
    

    constructor(
        private snapService : SnapService,
        private albumService : AlbumService,
        private router : Router,
        private location : Location,
        private authenticationService : AuthenticationService
    ){ }

    ngOnInit(): void {       
        this.authenticationService.getUser().subscribe(userObservabble => {
            this.user = userObservabble;
        });

       this.albumService.getAlbums()
            .then(albums => {
                this.albums = albums;
        });
    }

    goBack() : void {
        this.location.back();
    }

    fileSubmit(): void {
        this.appendToFile();
        this.uploader.uploadAll();
    }

    appendToFile() : void {
        this.uploader.onBuildItemForm = (item : any, form : any) => {
            form.append("name", this.name);
            form.append("description", this.description);
            form.append("type", this.type);
            // console.log("logged user is "+ this.user.);
            form.append("userIdentifier", this.user.username);
            form.append("album", JSON.stringify(this.album));
            
        };

    }
}