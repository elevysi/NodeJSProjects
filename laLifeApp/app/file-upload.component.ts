import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { Snap } from "./snap";

import { SnapService } from "./snap.service";

import { FileUploader } from "ng2-file-upload/ng2-file-upload";

import "rxjs/add/operator/switchMap";

@Component({
    moduleId : module.id,
    selector : "<file-upload></file-upload>",
    templateUrl : "file-upload.component.html"
})





export class FileUploadComponent implements OnInit{

    private snapUrl = "api/snaps";

    name : string;
    description : string;
    path : string;

    public uploader : FileUploader = new FileUploader({url: this.snapUrl});
    
    // hasBaseDropZoneOver : boolean = false;
    // hasAnotherDropzoneOver : boolean = false;

    // public fileOverBase(e : any): void {
    //     this.hasBaseDropZoneOver = e;
    // }

    // public fileOverAnother(e:any): void{
    //     this.hasAnotherDropzoneOver = e;
    // }

    constructor(
        private snapService : SnapService,
        private router : Router,
        private location : Location
    ){ }

    ngOnInit(): void {
        // console.log("Start appending");
        // this.uploader.onBuildItemForm = (fileItem: any, form: any) => {

        //     var snap  : Snap = {
        //     name : "Adele",
        //     description : "Remedy",
        //     path : "Loco"
        //     };

        // form.append("snap", snap);
        // // form.append('someField2': this.someValue2);
        // };
    }

    addSnap(): void {
        var snap  : Snap = {
            name : this.name,
            description : this.description,
            path : this.path
        };

        // var snap = {
        //     name : this.name,
        //     description : this.description,
        //     path : this.path
        // };

        this.snapService.addSnap(snap)
            .then(() => this.goBack());

        // console.log(snap);
    }

    goBack() : void {
        this.location.back();
    }

    fileSubmit(): void {
        this.appendToFile();
        console.log("After appending");
        this.uploader.uploadAll();
    }

    appendToFile() : void {
        // console.log("Appending to file");
        this.uploader.onBuildItemForm = (item : any, form : any) => {

            // var snap  : Snap = {
            // name : this.name,
            // description : this.description,
            // path : this.path
            // };

            var snap  : Snap = {
            name : "Adele",
            description : "Remedy",
            path : "Loco"
            };

            // form.append("name" : "Elvis");
            // form.append({'someField': "this.someValue"});
            // form.append("snap", snap);
            form.append('snap', JSON.stringify(snap));

            // return {item, form};
        };

    }


}