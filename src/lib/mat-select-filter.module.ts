import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectFilterComponent } from './mat-select-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MatSelectFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [MatSelectFilterComponent]
})
export class MatSelectFilterModule { }
