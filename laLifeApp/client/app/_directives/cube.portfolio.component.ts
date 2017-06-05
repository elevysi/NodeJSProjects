import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snap } from "../_models/snap";

declare var $:JQueryStatic;
/// <reference path="cube.portfolio.d.ts" />



@Component({
    moduleId: module.id,
    selector: 'cubeportfolio',
    templateUrl: 'cube.portfolio.component.html'
})
 
export class CubePortfolioComponent implements OnInit, AfterViewInit{
    
    @ViewChild('gridSnapsContainer') 
    el:ElementRef;

    cubePortfolioInited : boolean = false;


    private _snaps = new BehaviorSubject<Snap[]>([]);
    snap : Snap;
    selectedSnapId : string;
    authToken : string;

    @Input()
    set snaps(value) {
        // set the latest value for _data BehaviorSubject
        this._snaps.next(value);
    };

    get snaps() {
        // get the latest value from _data BehaviorSubject
        return this._snaps.getValue();
    }

    compSnaps : Snap [];
    
    ngOnInit() {
        this._snaps
            .subscribe (snaps => {
                this.compSnaps = snaps;
                this.applyCubePortfolio();
            });
    }
 
    applyCubePortfolio(){

        let authToken = localStorage.getItem('auth_token');
       
        var options = {
        layoutMode: 'grid',
        rewindNav: true,
        scrollByPage: false,
        mediaQueries: [{
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 500,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'rotateSides',
        gapHorizontal: 10,
        gapVertical: 10,
        gridAdjustment: 'responsive',
        caption: 'overlayBottomPush',
        displayType: 'sequentially',
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url : any, element : any) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
        },

        // singlePageInline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'below',
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url : any, element : any) {
            // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
            var t = this;            
            // Update with the service
            $.ajax({
                    url: "api/snap/"+url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 5000,
                    headers: {'Authorization': 'Bearer ' + authToken}
                })
                .done(function(result) {

                    t.updateSinglePageInline(result);

                })
                .fail(function() {
                    t.updateSinglePageInline("Error! You need to login to view snaps.");
                });
        }
    };
    
        
        if(this.compSnaps != null){
            if(this.cubePortfolioInited){
                /**
                 * Start by a destroy
                 */
                $(this.el.nativeElement).cubeportfolio('destroy');
            }

            setTimeout(() => { 
                $(this.el.nativeElement).cubeportfolio(options);
                this.cubePortfolioInited = true;

            }, 2000);
//     $(this.el.nativeElement).cubeportfolio('appendItems', htmlContent);
        }
    }

    ngAfterViewInit() {
        
    }
    
}