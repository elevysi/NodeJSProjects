"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
/// <reference path="cube.portfolio.d.ts" />
var CubePortfolioComponent = (function () {
    function CubePortfolioComponent() {
        this.cubePortfolioInited = false;
        // @Input()
        // snaps : Snap [] = [];
        this._snaps = new BehaviorSubject_1.BehaviorSubject([]);
    }
    Object.defineProperty(CubePortfolioComponent.prototype, "snaps", {
        get: function () {
            // get the latest value from _data BehaviorSubject
            return this._snaps.getValue();
        },
        set: function (value) {
            // set the latest value for _data BehaviorSubject
            this._snaps.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    CubePortfolioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._snaps
            .subscribe(function (snaps) {
            _this.compSnaps = snaps;
            console.log(_this.compSnaps);
            _this.applyCubePortfolio();
        });
    };
    CubePortfolioComponent.prototype.applyCubePortfolio = function () {
        var _this = this;
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
            singlePageCallback: function (url, element) {
                // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            },
            // singlePageInline
            singlePageInlineDelegate: '.cbp-singlePageInline',
            singlePageInlinePosition: 'below',
            singlePageInlineInFocus: true,
            singlePageInlineCallback: function (url, element) {
                // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
                var t = this;
                console.log("In directive");
                console.log(element);
                var compHtml = "\n                <div class=\"cbp-l-inline\">\n                    <div class=\"cbp-l-inline-left\">\n                        <img src=\"assets/img/portfolio/6.jpg\" alt=\"Dashboard\" class=\"cbp-l-project-img\">\n                    </div>\n\n                    <div class=\"cbp-l-inline-right\">\n                        <div class=\"cbp-l-inline-title\">Remind~Me Widget</div>\n                        <div class=\"cbp-l-inline-subtitle\">by Tiberiu Neamu</div>\n\n                        <div class=\"cbp-l-inline-desc\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, cumque, earum blanditiis incidunt minus commodi consequatur provident quae. Nihil, alias, vel consequatur ab aliquam aspernatur optio harum facilis excepturi mollitia autem voluptas cum ex veniam numquam quia repudiandae in iure. Assumenda, vel provident molestiae perferendis officia commodi asperiores earum sapiente inventore quam deleniti mollitia consequatur expedita quaerat natus praesentium beatae!</div>\n\n                        <a href=\"#\" target=\"_blank\" class=\"cbp-l-inline-view\">VIEW PROJECT</a>\n                    </div>\n                </div>\n            ";
                // t.updateSinglePageInline(compHtml);
                t.updateSinglePageInline("<cubeimage>I say smoe</cubeimage>");
                // t.updateSinglePageInline("Hello World!");
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
        if (this.compSnaps != null) {
            console.log("Called here ");
            console.log(this.compSnaps);
            if (this.cubePortfolioInited) {
                /**
                 * Start by a destroy
                 */
                $(this.el.nativeElement).cubeportfolio('destroy');
            }
            setTimeout(function () {
                $(_this.el.nativeElement).cubeportfolio(options);
                _this.cubePortfolioInited = true;
            }, 2000);
        }
    };
    CubePortfolioComponent.prototype.ngAfterViewInit = function () {
    };
    CubePortfolioComponent.prototype.selectedSnap = function () {
        console.log("This is the snap I selected");
    };
    __decorate([
        core_1.ViewChild('gridSnapsContainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], CubePortfolioComponent.prototype, "el", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CubePortfolioComponent.prototype, "snaps", null);
    CubePortfolioComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cubeportfolio',
            templateUrl: 'cube.portfolio.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CubePortfolioComponent);
    return CubePortfolioComponent;
}());
exports.CubePortfolioComponent = CubePortfolioComponent;
//# sourceMappingURL=cube.portfolio.component.js.map