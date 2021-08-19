import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { A, Z, ZERO, NINE, SPACE, } from '@angular/cdk/keycodes';
export class MatSelectFilterComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0LXNlbGVjdC1maWx0ZXIvc3JjL2xpYi9tYXQtc2VsZWN0LWZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFhLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxDQUFDLEVBQ0QsQ0FBQyxFQUNELElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxHQUNOLE1BQU0sdUJBQXVCLENBQUM7QUFpQi9CLE1BQU0sT0FBTyx3QkFBd0I7SUFvQm5DLFlBQVksRUFBZTtRQWJMLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2QscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBSTNELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDWCxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUMsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFJN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUMxQjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNsQixvRUFBb0U7Z0JBQ3BFLElBQUksSUFB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QUFLLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNoRCxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBakdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7O2FBRUY7OztZQXZCbUIsV0FBVzs7O29CQXlCNUIsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7b0JBRW5DLEtBQUssU0FBQyxPQUFPOzBCQUNiLEtBQUssU0FBQyxhQUFhO29CQUNuQixLQUFLLFNBQUMsT0FBTzs0QkFDYixLQUFLLFNBQUMsZUFBZTswQkFDckIsS0FBSyxTQUFDLGFBQWE7K0JBQ25CLEtBQUssU0FBQyxrQkFBa0I7dUJBQ3hCLEtBQUssU0FBQyxVQUFVOzZCQUNoQixLQUFLLFNBQUMsZ0JBQWdCOzZCQUt0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBBLFxuICBaLFxuICBaRVJPLFxuICBOSU5FLFxuICBTUEFDRSwgRU5ELCBIT01FLFxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYFxuICA8Zm9ybSBbZm9ybUdyb3VwXT1cInNlYXJjaEZvcm1cIiBjbGFzcz1cIm1hdC1maWx0ZXJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvciA/IGNvbG9yIDogJ3doaXRlJ31cIj5cbiAgPGRpdj5cbiAgPGlucHV0ICNpbnB1dCBjbGFzcz1cIm1hdC1maWx0ZXItaW5wdXRcIiBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgKGtleWRvd24pPVwiaGFuZGxlS2V5ZG93bigkZXZlbnQpXCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwibG9jYWxTcGlubmVyXCIgY2xhc3M9XCJzcGlubmVyXCIgZGlhbWV0ZXI9XCIxNlwiPjwvbWF0LXNwaW5uZXI+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwibm9SZXN1bHRzXCJcbiAgICAgY2xhc3M9XCJub1Jlc3VsdHNNZXNzYWdlXCI+XG4gIHt7bm9SZXN1bHRzTWVzc2FnZX19XG48L2Rpdj5cbjwvZm9ybT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LXNlbGVjdC1maWx0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXQ7XG5cbiAgQElucHV0KCdhcnJheScpIGFycmF5OiBhbnk7XG4gIEBJbnB1dCgncGxhY2Vob2xkZXInKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoJ2NvbG9yJykgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCdkaXNwbGF5TWVtYmVyJykgZGlzcGxheU1lbWJlcjogc3RyaW5nO1xuICBASW5wdXQoJ3Nob3dTcGlubmVyJykgc2hvd1NwaW5uZXIgPSB0cnVlO1xuICBASW5wdXQoJ25vUmVzdWx0c01lc3NhZ2UnKSBub1Jlc3VsdHNNZXNzYWdlID0gJ05vIHJlc3VsdHMnO1xuICBASW5wdXQoJ2hhc0dyb3VwJykgaGFzR3JvdXA6IGJvb2xlYW47XG4gIEBJbnB1dCgnZ3JvdXBBcnJheU5hbWUnKSBncm91cEFycmF5TmFtZTogc3RyaW5nO1xuXG4gIG5vUmVzdWx0cyA9IGZhbHNlO1xuXG4gIGxvY2FsU3Bpbm5lciA9IGZhbHNlO1xuICBAT3V0cHV0KCkgZmlsdGVyZWRSZXR1cm4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgZmlsdGVyZWRJdGVtczogYW55ID0gW107XG4gIHB1YmxpYyBzZWFyY2hGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY29uc3RydWN0b3IoZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy5zZWFyY2hGb3JtID0gZmIuZ3JvdXAoe1xuICAgICAgdmFsdWU6ICcnXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlYXJjaEZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodGhpcy5zaG93U3Bpbm5lcikge1xuICAgICAgICB0aGlzLmxvY2FsU3Bpbm5lciA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVbJ3ZhbHVlJ10pIHtcbiAgICAgICAgLy8gSUYgVEhFIERJU1BMQVkgTUVNQkVSIElOUFVUIElTIFNFVCBXRSBDSEVDSyBUSEUgU1BFQ0lGSUMgUFJPUEVSVFlcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheU1lbWJlciA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5maWx0ZXJlZEl0ZW1zID0gdGhpcy5hcnJheS5maWx0ZXIobmFtZSA9PiBuYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWVbJ3ZhbHVlJ10udG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICAgIC8vIE9USEVSV0lTRSwgV0UgQ0hFQ0sgVEhFIEVOVElSRSBTVFJJTkdcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0dyb3VwICYmIHRoaXMuZ3JvdXBBcnJheU5hbWUgJiYgdGhpcy5kaXNwbGF5TWVtYmVyKSB7XG4gICAgICAgICAgdGhpcy5maWx0ZXJlZEl0ZW1zID0gdGhpcy5hcnJheS5tYXAoYSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmpDb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgYSk7XG4gICAgICAgICAgICBvYmpDb3B5W3RoaXMuZ3JvdXBBcnJheU5hbWVdID0gb2JqQ29weVt0aGlzLmdyb3VwQXJyYXlOYW1lXS5maWx0ZXIoZyA9PiBnW3RoaXMuZGlzcGxheU1lbWJlcl0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZVsndmFsdWUnXS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqQ29weTtcbiAgICAgICAgICB9KS5maWx0ZXIoeCA9PiB4W3RoaXMuZ3JvdXBBcnJheU5hbWVdLmxlbmd0aCA+IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IHRoaXMuYXJyYXkuZmlsdGVyKG5hbWUgPT4gbmFtZVt0aGlzLmRpc3BsYXlNZW1iZXJdLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWVbJ3ZhbHVlJ10udG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5PIFJFU1VMVFMgVkFMSURBVElPTlxuXG4gICAgICAgIHRoaXMubm9SZXN1bHRzID0gdGhpcy5maWx0ZXJlZEl0ZW1zID09IG51bGwgfHwgdGhpcy5maWx0ZXJlZEl0ZW1zLmxlbmd0aCA9PT0gMDtcblxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSB0aGlzLmFycmF5LnNsaWNlKCk7XG4gICAgICAgIHRoaXMubm9SZXN1bHRzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlcmVkUmV0dXJuLmVtaXQodGhpcy5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zaG93U3Bpbm5lcikge1xuICAgICAgICAgIHRoaXMubG9jYWxTcGlubmVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sIDIwMDApO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9LCA1MDApO1xuICAgIGlmICghdGhpcy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBQUkVWRU5UIFBST1BBR0FUSU9OIEZPUiBBTEwgQUxQSEFOVU1FUklDIENIQVJBQ1RFUlMgSU4gT1JERVIgVE8gQVZPSUQgU0VMRUNUSU9OIElTU1VFU1xuICAgIGlmICgoZXZlbnQua2V5ICYmIGV2ZW50LmtleS5sZW5ndGggPT09IDEpIHx8XG4gICAgICAoZXZlbnQua2V5Q29kZSA+PSBBICYmIGV2ZW50LmtleUNvZGUgPD0gWikgfHxcbiAgICAgIChldmVudC5rZXlDb2RlID49IFpFUk8gJiYgZXZlbnQua2V5Q29kZSA8PSBOSU5FKSB8fFxuICAgICAgKGV2ZW50LmtleUNvZGUgPT09IFNQQUNFKSkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZmlsdGVyZWRSZXR1cm4uZW1pdCh0aGlzLmFycmF5KTtcbiAgfVxufVxuIl19