import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snap } from "../_models/snap";

declare var $:JQueryStatic;
/// <reference path="cube.portfolio.d.ts" />



@Component({
    moduleId: module.id,
    selector: 'cubeimage',
    templateUrl: 'cube.image.component.html'
})
 
export class CubeImageComponent implements OnInit{
    ngOnInit() : void {

    }
}