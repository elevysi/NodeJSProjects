import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { Snap } from "../_models/snap";
import { SnapService } from "../_services/snap.service";

@Component({
    moduleId: module.id,
    selector : "lalifeapp",
    templateUrl : 'snaps.component.html'
})

export class SnapsComponent implements OnInit{
    snaps : Snap [] = [];
    rows : number[];

    constructor(
        private snapService : SnapService,
        private router : Router,
        private location : Location
    ){};

    getSnaps(): void{
        this.snapService.getSnaps()
            .then(snaps => {
                this.snaps = snaps;
                this.rows = Array.from(Array(Math.ceil(this.snaps.length / 3)).keys());
                // console.log(this.rows);
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