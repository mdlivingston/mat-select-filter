import { defineInjectable, Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A, Z, ZERO, NINE, SPACE } from '@angular/cdk/keycodes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

class MatSelectFilterService {
    constructor() { }
}
MatSelectFilterService.ɵprov = defineInjectable({ factory: function MatSelectFilterService_Factory() { return new MatSelectFilterService(); }, token: MatSelectFilterService, providedIn: "root" });
MatSelectFilterService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
MatSelectFilterService.ctorParameters = () => [];

class MatSelectFilterComponent {
    constructor(fb) {
        this.showSpinner = true;
        this.noResultsMessage = 'No results';
        this.noResults = false;
        this.localSpinner = false;
        this.filteredReturn = new EventEmitter();
        this.filteredItems = [];
        this.searchForm = fb.group({
            value: ''
        });
    }
    ngOnInit() {
        this.searchForm.valueChanges.subscribe(value => {
            if (this.showSpinner) {
                this.localSpinner = true;
            }
            if (value['value']) {
                // IF THE DISPLAY MEMBER INPUT IS SET WE CHECK THE SPECIFIC PROPERTY
                if (this.displayMember == null) {
                    this.filteredItems = this.array.filter(name => name.toLowerCase().includes(value['value'].toLowerCase()));
                    // OTHERWISE, WE CHECK THE ENTIRE STRING
                }
                else if (this.hasGroup && this.groupArrayName && this.displayMember) {
                    this.filteredItems = this.array.map(a => {
                        const objCopy = Object.assign({}, a);
                        objCopy[this.groupArrayName] = objCopy[this.groupArrayName].filter(g => g[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
                        return objCopy;
                    }).filter(x => x[this.groupArrayName].length > 0);
                }
                else {
                    this.filteredItems = this.array.filter(name => name[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
                }
                // NO RESULTS VALIDATION
                this.noResults = this.filteredItems == null || this.filteredItems.length === 0;
            }
            else {
                this.filteredItems = this.array.slice();
                this.noResults = false;
            }
            this.filteredReturn.emit(this.filteredItems);
            setTimeout(() => {
                if (this.showSpinner) {
                    this.localSpinner = false;
                }
            }, 2000);
        });
        setTimeout(() => {
            this.input.nativeElement.focus();
        }, 500);
        if (!this.placeholder) {
            this.placeholder = 'Search...';
        }
    }
    handleKeydown(event) {
        // PREVENT PROPAGATION FOR ALL ALPHANUMERIC CHARACTERS IN ORDER TO AVOID SELECTION ISSUES
        if ((event.key && event.key.length === 1) ||
            (event.keyCode >= A && event.keyCode <= Z) ||
            (event.keyCode >= ZERO && event.keyCode <= NINE) ||
            (event.keyCode === SPACE)) {
            event.stopPropagation();
        }
    }
    ngOnDestroy() {
        this.filteredReturn.emit(this.array);
    }
}
MatSelectFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-select-filter',
                template: `
  <form [formGroup]="searchForm" class="mat-filter" [ngStyle]="{'background-color': color ? color : 'white'}">
  <div>
  <input #input class="mat-filter-input" matInput placeholder="{{placeholder}}" formControlName="value" (keydown)="handleKeydown($event)">
    <mat-spinner *ngIf="localSpinner" class="spinner" diameter="16"></mat-spinner>
  </div>
  <div *ngIf="noResults"
     class="noResultsMessage">
  {{noResultsMessage}}
</div>
</form>
  `,
                styles: [".mat-filter{position:sticky;top:0;border-bottom:1px solid grey;z-index:100;font-size:inherit;box-shadow:none;border-radius:0;padding:16px;box-sizing:border-box}.mat-filter-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border:0;background-color:unset;color:grey;width:100%}.spinner{position:absolute;right:16px;top:calc(50% - 8px)}.noResultsMessage{margin-top:10px;font-family:Roboto,Helvetica Neue,sans-serif;font-size:16px}"]
            },] }
];
MatSelectFilterComponent.ctorParameters = () => [
    { type: FormBuilder }
];
MatSelectFilterComponent.propDecorators = {
    input: [{ type: ViewChild, args: ['input', { static: true },] }],
    array: [{ type: Input, args: ['array',] }],
    placeholder: [{ type: Input, args: ['placeholder',] }],
    color: [{ type: Input, args: ['color',] }],
    displayMember: [{ type: Input, args: ['displayMember',] }],
    showSpinner: [{ type: Input, args: ['showSpinner',] }],
    noResultsMessage: [{ type: Input, args: ['noResultsMessage',] }],
    hasGroup: [{ type: Input, args: ['hasGroup',] }],
    groupArrayName: [{ type: Input, args: ['groupArrayName',] }],
    filteredReturn: [{ type: Output }]
};

class MatSelectFilterModule {
}
MatSelectFilterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatSelectFilterComponent],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatProgressSpinnerModule
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

export { MatSelectFilterComponent, MatSelectFilterModule, MatSelectFilterService };
//# sourceMappingURL=mat-select-filter.js.map
