(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/cdk/keycodes'), require('@angular/material/progress-spinner'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('mat-select-filter', ['exports', '@angular/core', '@angular/forms', '@angular/cdk/keycodes', '@angular/material/progress-spinner', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['mat-select-filter'] = {}, global.ng.core, global.ng.forms, global.ng.cdk.keycodes, global.ng.material.progressSpinner, global.ng.common));
}(this, (function (exports, i0, forms, keycodes, progressSpinner, common) { 'use strict';

    var MatSelectFilterService = /** @class */ (function () {
        function MatSelectFilterService() {
        }
        return MatSelectFilterService;
    }());
    MatSelectFilterService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MatSelectFilterService_Factory() { return new MatSelectFilterService(); }, token: MatSelectFilterService, providedIn: "root" });
    MatSelectFilterService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    MatSelectFilterService.ctorParameters = function () { return []; };

    var MatSelectFilterComponent = /** @class */ (function () {
        function MatSelectFilterComponent(fb) {
            this.showSpinner = true;
            this.noResultsMessage = 'No results';
            this.noResults = false;
            this.localSpinner = false;
            this.filteredReturn = new i0.EventEmitter();
            this.filteredItems = [];
            this.searchForm = fb.group({
                value: ''
            });
        }
        MatSelectFilterComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.searchForm.valueChanges.subscribe(function (value) {
                if (_this.showSpinner) {
                    _this.localSpinner = true;
                }
                if (value['value']) {
                    // IF THE DISPLAY MEMBER INPUT IS SET WE CHECK THE SPECIFIC PROPERTY
                    if (_this.displayMember == null) {
                        _this.filteredItems = _this.array.filter(function (name) { return name.toLowerCase().includes(value['value'].toLowerCase()); });
                        // OTHERWISE, WE CHECK THE ENTIRE STRING
                    }
                    else if (_this.hasGroup && _this.groupArrayName && _this.displayMember) {
                        _this.filteredItems = _this.array.map(function (a) {
                            var objCopy = Object.assign({}, a);
                            objCopy[_this.groupArrayName] = objCopy[_this.groupArrayName].filter(function (g) { return g[_this.displayMember].toLowerCase().includes(value['value'].toLowerCase()); });
                            return objCopy;
                        }).filter(function (x) { return x[_this.groupArrayName].length > 0; });
                    }
                    else {
                        _this.filteredItems = _this.array.filter(function (name) { return name[_this.displayMember].toLowerCase().includes(value['value'].toLowerCase()); });
                    }
                    // NO RESULTS VALIDATION
                    _this.noResults = _this.filteredItems == null || _this.filteredItems.length === 0;
                }
                else {
                    _this.filteredItems = _this.array.slice();
                    _this.noResults = false;
                }
                _this.filteredReturn.emit(_this.filteredItems);
                setTimeout(function () {
                    if (_this.showSpinner) {
                        _this.localSpinner = false;
                    }
                }, 2000);
            });
            setTimeout(function () {
                _this.input.nativeElement.focus();
            }, 500);
            if (!this.placeholder) {
                this.placeholder = 'Search...';
            }
        };
        MatSelectFilterComponent.prototype.handleKeydown = function (event) {
            // PREVENT PROPAGATION FOR ALL ALPHANUMERIC CHARACTERS IN ORDER TO AVOID SELECTION ISSUES
            if ((event.key && event.key.length === 1) ||
                (event.keyCode >= keycodes.A && event.keyCode <= keycodes.Z) ||
                (event.keyCode >= keycodes.ZERO && event.keyCode <= keycodes.NINE) ||
                (event.keyCode === keycodes.SPACE)) {
                event.stopPropagation();
            }
        };
        MatSelectFilterComponent.prototype.ngOnDestroy = function () {
            this.filteredReturn.emit(this.array);
        };
        return MatSelectFilterComponent;
    }());
    MatSelectFilterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mat-select-filter',
                    template: "\n  <form [formGroup]=\"searchForm\" class=\"mat-filter\" [ngStyle]=\"{'background-color': color ? color : 'white'}\">\n  <div>\n  <input #input class=\"mat-filter-input\" matInput placeholder=\"{{placeholder}}\" formControlName=\"value\" (keydown)=\"handleKeydown($event)\">\n    <mat-spinner *ngIf=\"localSpinner\" class=\"spinner\" diameter=\"16\"></mat-spinner>\n  </div>\n  <div *ngIf=\"noResults\"\n     class=\"noResultsMessage\">\n  {{noResultsMessage}}\n</div>\n</form>\n  ",
                    styles: [".mat-filter{position:sticky;top:0;border-bottom:1px solid grey;z-index:100;font-size:inherit;box-shadow:none;border-radius:0;padding:16px;box-sizing:border-box}.mat-filter-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border:0;background-color:unset;color:grey;width:100%}.spinner{position:absolute;right:16px;top:calc(50% - 8px)}.noResultsMessage{margin-top:10px;font-family:Roboto,Helvetica Neue,sans-serif;font-size:16px}"]
                },] }
    ];
    MatSelectFilterComponent.ctorParameters = function () { return [
        { type: forms.FormBuilder }
    ]; };
    MatSelectFilterComponent.propDecorators = {
        input: [{ type: i0.ViewChild, args: ['input', { static: true },] }],
        array: [{ type: i0.Input, args: ['array',] }],
        placeholder: [{ type: i0.Input, args: ['placeholder',] }],
        color: [{ type: i0.Input, args: ['color',] }],
        displayMember: [{ type: i0.Input, args: ['displayMember',] }],
        showSpinner: [{ type: i0.Input, args: ['showSpinner',] }],
        noResultsMessage: [{ type: i0.Input, args: ['noResultsMessage',] }],
        hasGroup: [{ type: i0.Input, args: ['hasGroup',] }],
        groupArrayName: [{ type: i0.Input, args: ['groupArrayName',] }],
        filteredReturn: [{ type: i0.Output }]
    };

    var MatSelectFilterModule = /** @class */ (function () {
        function MatSelectFilterModule() {
        }
        return MatSelectFilterModule;
    }());
    MatSelectFilterModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [MatSelectFilterComponent],
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        progressSpinner.MatProgressSpinnerModule
                    ],
                    exports: [MatSelectFilterComponent]
                },] }
    ];

    /*
     * Public API Surface of mat-select-filter
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MatSelectFilterComponent = MatSelectFilterComponent;
    exports.MatSelectFilterModule = MatSelectFilterModule;
    exports.MatSelectFilterService = MatSelectFilterService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mat-select-filter.umd.js.map
