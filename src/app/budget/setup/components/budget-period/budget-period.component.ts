import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateUtils} from "../../../../common/utils/date.utils";

@Component({
    selector: 'budget-setup-period',
    templateUrl: './budget-period.component.html',
    styleUrls: ['./budget-period.component.scss']
})
export class BudgetPeriodComponent implements OnInit {

    dateFrom: string;
    dateTo: string;
    dateDisplayFormat = "DD.MM.YYYY";

    @Output() startDateChange = new EventEmitter();
    @Output() endDateChange = new EventEmitter();
    @Input()
    get startDate() {
        return this.dateFrom;
    }
    set startDate(value){
        this.dateFrom = value;
        this.startDateChange.emit(this.dateFrom);
    }

    @Input()
    get endDate(){
        return this.dateTo;
    }
    set endDate(value){
        this.dateTo = value;
        this.endDateChange.emit(this.dateTo);
    }

    constructor() {
    }

    ngOnInit() {
        let date = new Date();

        if(!this.dateFrom) {
            this.dateFrom = DateUtils.getUnifiedDateString(new Date(date.getFullYear(), date.getMonth(), 1));
        }

        if(!this.dateTo) {
            this.dateTo = DateUtils.getUnifiedDateString(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        }

        this.startDateChange.emit(this.dateFrom);
        this.endDateChange.emit(this.dateTo);
    }
}
