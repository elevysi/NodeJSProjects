import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import {Subject} from 'rxjs/Subject';

import { Snap } from "../_models/snap";
import { SnapService } from "../_services/snap.service";

@Component({
    moduleId: module.id,
    selector : "lalifeapp",
    templateUrl : 'snaps.component.html'
})

export class SnapsComponent implements OnInit{

    snaps : Subject <Snap[]> = new Subject();
    snaps$ = this.snaps.asObservable();
    compSnaps : Snap [];

    constructor(
        private snapService : SnapService,
        private router : Router,
        private location : Location
    ){};

    getSnaps(): void{
        this.snapService.getSnaps()
            .then(snaps => {
                this.compSnaps = snaps;
                this.snaps.next(snaps);
                // console.log(this.snaps.map());
                console.log(this.compSnaps);
            });
    }

    ngOnInit(): void {
        this.getSnaps();
    }

    deleteSnap(id : string): void{
        this.snapService.deleteSnap(id)
            .then(() => {
                // this.goBack();
                this.router.navigateByUrl("/");
            });
    }

    goBack() : void {
        this.location.back();
    }
}