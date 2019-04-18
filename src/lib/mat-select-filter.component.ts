import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'mat-select-filter',
  template: `
    <form [formGroup]="searchForm" class="mat-filter" [ngStyle]="{'background-color': color ? color : 'white'}">
      <input #input class="mat-filter-input" matInput placeholder="{{placeholder}}" formControlName="value">
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
      if (value['value']) {
        if (this.displayMember == null) {
          this.filteredItems = this.array.filter(name => name.toLowerCase().includes(value['value'].toLowerCase()));
        } else {
          this.filteredItems = this.array.filter(name => name[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
        }
      } else {
        this.filteredItems = this.array.slice();
      }
      this.filteredReturn.emit(this.filteredItems);
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
