(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/andrewwardwell/Sites/switch-wid-app/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Uw9c":
/*!*******************************************************!*\
  !*** ./src/app/components/widget/widget.component.ts ***!
  \*******************************************************/
/*! exports provided: WidgetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetComponent", function() { return WidgetComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_widget_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/widget.service */ "a5fw");
/* harmony import */ var ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-owl-carousel */ "uxF4");
/* harmony import */ var ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






const _c0 = ["owlCar"];
function WidgetComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const combo_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", "slide-" + i_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", combo_r2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
} }
const _c1 = function () { return ["owl-theme", "row", "sliding"]; };
const _c2 = function (a0) { return { "with-arrows": a0 }; };
class WidgetComponent {
    constructor(widgetService) {
        this.widgetService = widgetService;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.libData = [];
        this.combos = [];
    }
    ngOnInit() {
        this.doFetch = this.fetch ? this.fetch : false;
        this.options = {
            items: 1,
            dots: this.dots ? this.dots : false,
            nav: this.nav ? this.nav : false,
            rewind: true,
            loop: this.loop ? this.loop : false,
            autoplay: this.autoplay ? this.autoplay : false,
            autoplaySpeed: 600,
            center: true,
            animateOut: 'animate__fadeOut',
            animateIn: 'animate__fadeIn',
            navText: ["<i class='fa-solid fa-chevron-left'></i>", "<i class='fa-solid fa-chevron-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 1,
                    nav: false
                },
                1000: {
                    items: 1
                }
            }
        };
        this.widgetService.getMaster().subscribe();
        this.widgetService.masterSource.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy$)).subscribe((response) => {
            this.processMaster(response);
            this.fetchLiveData();
        });
    }
    processMaster(resp) {
        resp.forEach(r => {
            const item = {
                id: r[0],
                spaces: r[1],
                text: r[2],
                nickname: r[3],
                commData: []
            };
            if (this.names) {
                let namesArray = this.names.split(',');
                let nameIncluded = namesArray.findIndex((n) => {
                    return n == item.nickname;
                });
                if (nameIncluded > -1) {
                    this.libData.push(item);
                }
            }
            else if (!this.names) {
                this.libData.push(item);
            }
        });
    }
    fetchLiveData() {
        const requests = [];
        const reqOrder = [];
        this.libData.forEach((item) => {
            reqOrder.push(item.id);
            requests.push(this.widgetService.getClauseValues(item.id));
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["forkJoin"])(requests).subscribe((response) => {
            response.forEach((val, ind) => {
                const id = reqOrder[ind];
                const libDataInd = this.libData.findIndex(i => i.id == id);
                this.libData[libDataInd].commData = val.values;
            });
            this.generateRandomCombinations(20);
            if (this.doFetch) {
                this.refreshInt = setInterval(() => this.refreshData(), 300000);
            }
        });
    }
    refreshData() {
        clearInterval(this.refreshInt);
        this.fetchLiveData();
    }
    generateRandomCombinations(number) {
        // this.combos = [];
        if (this.libData && this.libData.length > 0) {
            for (let b = 0; b <= number; b++) {
                const randomLib = (Math.random() * (this.libData.length - 1 + 1)) << 0;
                const data = this.libData[randomLib];
                const numberOfBlanks = parseInt(data.spaces);
                let toFill = new String(data.text);
                const values = [];
                const userData = data.commData;
                // '(?<={).*?(?=})'          look behind doesn't work in safari
                // "{([^}]*)"
                const between = new RegExp("{(.*?)}", 'g');
                const matches = toFill.match(between);
                // pick randomly from commddata
                for (let i = 0; i <= numberOfBlanks; i++) {
                    const randomRow = (Math.random() * (userData.length - 1 + 1)) << 0;
                    if (userData && userData[randomRow]) {
                        const val = userData[randomRow][i];
                        const nameSpot = numberOfBlanks;
                        const ageSpot = numberOfBlanks + 1;
                        const userName = userData[randomRow][nameSpot];
                        const userAge = userData[randomRow][ageSpot];
                        const userInfo = userName ? `<div class="super">${(userName && userAge ? userName + ', ' + userAge : userName)}</div>` : '';
                        const valHtml = `<span class="blank">${userInfo}${val}</span>`;
                        toFill = toFill.replace(`${matches[i]}`, valHtml);
                    }
                }
                this.combos.push(toFill);
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
WidgetComponent.ɵfac = function WidgetComponent_Factory(t) { return new (t || WidgetComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_widget_service__WEBPACK_IMPORTED_MODULE_3__["WidgetService"])); };
WidgetComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: WidgetComponent, selectors: [["app-widget"]], viewQuery: function WidgetComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.carouselEl = _t.first);
    } }, inputs: { names: "names", dots: "dots", nav: "nav", autoplay: "autoplay", loop: "loop", fetch: "fetch" }, decls: 4, vars: 9, consts: [[1, "wid-container"], [3, "options", "items", "carouselClasses", "ngClass"], ["owlCar", ""], ["class", "item wid-item", 3, "id", 4, "ngFor", "ngForOf"], [1, "item", "wid-item", 3, "id"], [1, "wid-text-viewer"], [1, "view-mode", "unstyled", "wid-text-viewer-wrapper"], [1, "wid-text-viewer-inner", 3, "innerHTML"]], template: function WidgetComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "owl-carousel", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, WidgetComponent_div_3_Template, 4, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.options)("items", ctx.combos)("carouselClasses", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](6, _c1))("items", ctx.combos)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c2, ctx.nav));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.combos);
    } }, directives: [ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_4__["OwlCarousel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], styles: [".wid-container[_ngcontent-%COMP%]   .wid-item[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 30px 10px;\n}\n.wid-container[_ngcontent-%COMP%]   .wid-item[_ngcontent-%COMP%]   .blank[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  font-weight: bold;\n}\n.wid-container[_ngcontent-%COMP%]   .wid-item[_ngcontent-%COMP%]   .super[_ngcontent-%COMP%] {\n  width: 100%;\n  position: absolute;\n  top: -35px;\n  display: block;\n  text-align: center;\n  white-space: nowrap;\n  color: black;\n  font-family: pvgj;\n  font-weight: 300;\n  font-style: normal;\n  font-size: 0.825rem;\n  text-transform: uppercase;\n}\n.wid-text-viewer-wrapper[_ngcontent-%COMP%] {\n  line-height: 80px;\n  font-family: Inter;\n  font-weight: 400;\n  font-size: 42px;\n}\n.wid-text-viewer-inner[_ngcontent-%COMP%] {\n  font-family: Inter;\n  font-weight: 400;\n  font-style: normal;\n  color: black;\n  font-size: 42px;\n}\n.owl-nav[_ngcontent-%COMP%]   .owl-next[_ngcontent-%COMP%], .owl-nav[_ngcontent-%COMP%]   .owl-prev[_ngcontent-%COMP%] {\n  display: inline-block;\n  zoom: 1;\n  margin: 5px;\n  padding: 3px 10px;\n  font-size: 42px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3dpZGdldC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7QUFBSjtBQUVNO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQVI7QUFFTTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUVBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBRFI7QUFRQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFMRjtBQU9BO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFKRjtBQU9BOztFQUVFLHFCQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFKRiIsImZpbGUiOiJ3aWRnZXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2lkLWNvbnRhaW5lcntcbiAgLndpZC1pdGVte1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgcGFkZGluZzogMzBweCAxMHB4O1xuXG4gICAgICAuYmxhbmt7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cbiAgICAgIC5zdXBlcntcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAtMzVweDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgLy8gdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNSUpO1xuICAgICAgICBjb2xvcjpyZ2JhKDAsIDAsIDAsIDEpO1xuICAgICAgICBmb250LWZhbWlseTpwdmdqO1xuICAgICAgICBmb250LXdlaWdodDozMDA7XG4gICAgICAgIGZvbnQtc3R5bGU6bm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IC44MjVyZW07XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICB9XG4gICAgXG4gIH1cblxuXG59XG4ud2lkLXRleHQtdmlld2VyLXdyYXBwZXJ7XG4gIGxpbmUtaGVpZ2h0OiA4MHB4O1xuICBmb250LWZhbWlseTogSW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogNDJweDtcbn1cbi53aWQtdGV4dC12aWV3ZXItaW5uZXJ7XG4gIGZvbnQtZmFtaWx5OiBJbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAxKTtcbiAgZm9udC1zaXplOiA0MnB4O1xufVxuXG4ub3dsLW5hdiAub3dsLW5leHQsXG4ub3dsLW5hdiAub3dsLXByZXZ7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgem9vbTogMTtcbiAgbWFyZ2luOiA1cHg7XG4gIHBhZGRpbmc6IDNweCAxMHB4O1xuICBmb250LXNpemU6IDQycHg7XG59Il19 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _components_widget_widget_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/widget/widget.component */ "Uw9c");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-owl-carousel */ "uxF4");
/* harmony import */ var ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/elements */ "Dti6");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class AppModule {
    constructor(injector) {
        this.injector = injector;
    }
    ngDoBootstrap() {
        const el = Object(_angular_elements__WEBPACK_IMPORTED_MODULE_4__["createCustomElement"])(_components_widget_widget_component__WEBPACK_IMPORTED_MODULE_1__["WidgetComponent"], { injector: this.injector });
        customElements.define('switchlit-widget', el);
    }
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppModule });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_3__["OwlModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_widget_widget_component__WEBPACK_IMPORTED_MODULE_1__["WidgetComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
        ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_3__["OwlModule"]] }); })();


/***/ }),

/***/ "a5fw":
/*!********************************************!*\
  !*** ./src/app/services/widget.service.ts ***!
  \********************************************/
/*! exports provided: WidgetService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetService", function() { return WidgetService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");





class WidgetService {
    constructor(http) {
        this.http = http;
        this.masterSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([]);
        this.offset = 'A2';
        this.limit = 'Z999';
        this.apikey = src_environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].apiKey;
        this.base = `https://sheets.googleapis.com/v4/spreadsheets/`;
        this.masterSheetId = "1eDjlSYP4CcHv8M4Mpp-h1s9QjifTDgfQO5xnbwYuAkY";
    }
    getMaster() {
        const uri = `${this.base}${this.masterSheetId}/values/Sheet1!${this.offset}:${this.limit}?key=${this.apikey}`;
        return this.http.get(uri).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((response) => {
            this.masterSource.next(response.values);
        }));
    }
    getClauseValues(id) {
        const uri = `${this.base}${id}/values/Sheet1!${this.offset}:${this.limit}?key=${this.apikey}`;
        return this.http.get(uri).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((response) => {
        }));
    }
}
WidgetService.ɵfac = function WidgetService_Factory(t) { return new (t || WidgetService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); };
WidgetService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: WidgetService, factory: WidgetService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "cxbk":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
const environment = {
    production: true,
    apiKey: "AIzaSyB7gsrkW6slHXQukg5FlaYtfhuhsf6lXow"
};


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map