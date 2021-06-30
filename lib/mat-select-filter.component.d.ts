import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export declare class MatSelectFilterComponent implements OnInit, OnDestroy {
    input: any;
    array: any;
    placeholder: string;
    color: string;
    displayMember: string;
    showSpinner: boolean;
    noResultsMessage: string;
    hasGroup: boolean;
    groupArrayName: string;
    noResults: boolean;
    localSpinner: boolean;
    filteredReturn: EventEmitter<any>;
    filteredItems: any;
    searchForm: FormGroup;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    handleKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
}
