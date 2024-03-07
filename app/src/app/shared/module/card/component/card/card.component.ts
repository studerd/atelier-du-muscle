import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardConfig, CardDefaultConfig} from '@shared/module/card/model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() config?: CardConfig = CardDefaultConfig;
    @Output() actionClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

}
