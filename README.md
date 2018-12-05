# mat-select-filter

## Github
https://github.com/mdlivingston/mat-select-filter

## Description

The mat-select-filter is a filterer for the material select drop downs. They currently do not support this so I decided to make my own. 

## Demo

https://stackblitz.com/edit/angular-mf9pqx

## Install 

#### npm

```
$ npm install mat-select-filter
```

## How to use

Be sure to import into desired module: 

```
import { MatSelectFilterModule } from 'mat-select-filter';
```

Next just add it to the desired material select: 

```
<mat-form-field>
  <mat-select>
    <mat-select-filter [array]="variables" (filterArrayReturn)="filteredVariables = $event"></mat-select-filter>
    <mat-option *ngFor="let variable of filteredVariables">
      {{variable}}
    </mat-option>
  </mat-select>
</mat-form-field>
```

Send your desired filtered array using the [array]="variables" or [array]="['one', 'two', 'three']". This input will only accept **basic arrays**.

The (filterArrayReturn) method returns the filtered results after every keyboard action while searching... 

The placeholder text for the search box is access by:

```
<mat-select-filter [placeholder]="'Search..'" [array]="variables" (filterArrayReturn)="filteredVariables = $event"></mat-select-filter>
```

but it defaults to 'Search...'

To focus the search input on every click you can do something like this: 

```
<mat-form-field>
  <mat-select #select [value]="selectedVariableName" placeholder="{{ placeholder }}">
    <mat-select-filter *ngIf="select.focused" [array]="variables" (filterArrayReturn)="filteredVariables = $event"></mat-select-filter>
    <mat-option *ngFor="let variable of filteredVariables">
      {{variable}}
    </mat-option>
  </mat-select>
</mat-form-field>
```

otherwise it will only focus once.

To add a colored background do something like this:

```
 <mat-select-filter [color]="'purple'" [array]="variables" (filterArrayReturn)="filteredVariables = $event"></mat-select-filter>
```


Hope you enjoy! 
