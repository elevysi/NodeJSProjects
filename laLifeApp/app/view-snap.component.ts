import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/switchMap";

import { Snap } from "./snap";
import { SnapService } from "./snap.service";


@Component({
    moduleId : module.id,
    selector : "view-snap",
    templateUrl : "view-snap.component.html"
})

export class ViewSnapComponent implements OnInit {

    @Input()
    snap : Snap;

    constructor(
        private snapService : SnapService,
        private route : ActivatedRoute
    ){}

    ngOnInit(): void {
        this.route.params
            .switchMap((params : Params) => this.snapService.getSnap(params['id']))
            .subscribe(snap => this.snap = snap);
    }
}