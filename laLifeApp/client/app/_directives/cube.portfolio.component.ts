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

    // @Input()
    // snaps : Snap [] = [];

    private _snaps = new BehaviorSubject<Snap[]>([]);

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
                console.log(this.compSnaps);
                this.applyCubePortfolio();
            });
    }
 
    applyCubePortfolio(){


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
            //Update with the service
            // $.ajax({
            //         url: url,
            //         type: 'GET',
            //         dataType: 'html',
            //         timeout: 5000
            //     })
            //     .done(function(result) {

            //         t.updateSinglePageInline(result);

            //     })
            //     .fail(function() {
            //         t.updateSinglePageInline("Error! Please refresh the page!");
            //     });
        }
    };
    
        
        if(this.compSnaps != null){
            console.log("Called here ");
            console.log(this.compSnaps);
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

            
//             var htmlContent : string =  `<div class="cbp-item print motion" *ngFor="let snap of compSnaps">
//         <a href="assets_onepageclassic/ajax/project1.html" class="cbp-caption cbp-singlePageInline" data-title="World Clock Widget<br>by Paul Flavius Nechita">
//         <div class="cbp-caption-defaultWrap">
//             <img src="assets_onepageclassic/img/portfolio/1.jpg" alt="">
//         </div>
//         <div class="cbp-caption-activeWrap">
//             <div class="cbp-l-caption-alignLeft">
//                 <div class="cbp-l-caption-body">
//                     <div class="cbp-l-caption-title">World Clock Widget</div>
//                     <div class="cbp-l-caption-desc">by Paul Flavius Nechita</div>
//                 </div>
//             </div>
//         </div>
//     </a>
// </div>`;

//     $(this.el.nativeElement).cubeportfolio('appendItems', htmlContent);
                
            
            }
    }

    ngAfterViewInit() {
        
    }
    
}