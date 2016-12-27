import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { Snap } from "./snap";

import { SnapService } from "./snap.service";

import "rxjs/add/operator/switchMap";

@Component({
    moduleId: module.id,
    selector : "add-snap",
    templateUrl : "add-Snap.component.html"
})

export class AddSnapComponent implements OnInit{

    // @Input()
    // snap : Snap;
    name : string;
    description : string;
    path : string;

    constructor(
        private snapService : SnapService,
        private router : Router,
        private location : Location
    ){ }

    ngOnInit(): void {

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


}