import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'mat-select-filter',
  template: `
  <form [formGroup]="searchForm" class="mat-filter" [ngStyle]="{'background-color': color ? color : 'white'}">
  <div>
    <input #input class="mat-filter-input" matInput placeholder="{{placeholder}}" formControlName="value">
    <mat-spinner *ngIf="localSpinner" class="spinner" diameter="16"></mat-spinner>
  </div>
  <div *ngIf="noResults"
     class="noResultsMessage">
  {{noResultsMessage}}
</div>
</form>
  `,
  styleUrls: ['./mat-select-filter.component.scss']
})
export class MatSelectFilterComponent implements OnInit, OnDestroy {
  @ViewChild('input') input;

  @Input('array') array: any;
  @Input('placeholder') placeholder: string;
  @Input('color') color: string;
  @Input('displayMember') displayMember: string;
  @Input('showSpinner') showSpinner = true;
  @Input('noResultsMessage') noResultsMessage = 'No results';
  noResults = false;

  localSpinner = false;
  @Output() filteredReturn = new EventEmitter<any>();

  public filteredItems: any = [];
  public searchForm: FormGroup;

  constructor(fb: FormBuilder) {
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
        } else {
          this.filteredItems = this.array.filter(name => name[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
        }
        // NO RESULTS VALIDATION

        this.noResults = this.filteredItems == null || this.filteredItems.length === 0;


      } else {
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

  ngOnDestroy() {
    this.filteredReturn.emit(this.array);
  }
}
