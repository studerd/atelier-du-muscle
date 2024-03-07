import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AddressFormConfig} from '@address/model';
import {addressHelper} from '@address/helper';
import {Subject} from 'rxjs';
import {AddressCreatePayload, AddressUpdatePayload} from '@address/model/payload';

@Component({
    selector: 'app-address-detail',
    templateUrl: './address-detail.component.html',
    styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit, OnDestroy {
    @Input() address?: Partial<AddressUpdatePayload> = addressHelper.getEmpty();
    @Output() addressChange = new EventEmitter<AddressCreatePayload>();
    @Input() formConfig?: AddressFormConfig
    destroyers$ = new Subject<void>();

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyers$.next();
        this.destroyers$.complete();
    }
}
