import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  A,
  Z,
  ZERO,
  NINE,
  SPACE, END, HOME,
} from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
@Component({
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
  styleUrls: ['./mat-select-filter.component.scss']
})
export class MatSelectFilterComponent implements OnInit, OnDestroy {
  private searchFormValueChangesSubscription: Subscription;
  @ViewChild('input', { static: true }) input;

  @Input('array') array: any;
  @Input('placeholder') placeholder: string;
  @Input('color') color: string;
  @Input('displayMember') displayMember: string;
  @Input('showSpinner') showSpinner = true;
  @Input('noResultsMessage') noResultsMessage = 'No results';
  @Input('hasGroup') hasGroup: boolean;
  @Input('groupArrayName') groupArrayName: string;

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
    this.searchFormValueChangesSubscription =  this.searchForm.valueChanges.subscribe(value => {
      if (this.showSpinner) {
        this.localSpinner = true;
      }
      if (value['value']) {
        // IF THE DISPLAY MEMBER INPUT IS SET WE CHECK THE SPECIFIC PROPERTY
        if (this.displayMember == null) {
          this.filteredItems = this.array.filter(name => name.toLowerCase().includes(value['value'].toLowerCase()));
          // OTHERWISE, WE CHECK THE ENTIRE STRING
        } else if (this.hasGroup && this.groupArrayName && this.displayMember) {
          this.filteredItems = this.array.map(a => {
            const objCopy = Object.assign({}, a);
            objCopy[this.groupArrayName] = objCopy[this.groupArrayName].filter(g => g[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
            return objCopy;
          }).filter(x => x[this.groupArrayName].length > 0);
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

  handleKeydown(event: KeyboardEvent) {
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
    this.searchFormValueChangesSubscription.unsubscribe();
  }
}
