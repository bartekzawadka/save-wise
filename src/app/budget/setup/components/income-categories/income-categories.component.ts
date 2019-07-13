import {Component, OnInit} from '@angular/core';
import {Cost} from "../../../../models/budget/Cost";
import {CostPositionInputMode} from "../../../../common/controls/cost-position-input/cost-position-input-mode";

@Component({
    selector: 'budget-income-categories',
    templateUrl: './income-categories.component.html',
    styleUrls: ['./income-categories.component.scss']
})
export class IncomeCategoriesComponent implements OnInit {

    public items: Cost[] = [];
    public summaryModel = new Cost();
    public summaryMode = CostPositionInputMode.summary;

    constructor() {
        this.summaryModel.name = "Suma";
    }

    ngOnInit() {
    }

    onItemsChanged(items: Cost[]) {
        this.items = items;
        if (this.items && this.items.length > 0) {
            let sum = 0.0;
            this.items.forEach(value => sum += value.value);
            this.summaryModel.value = sum;
        }
    }
}
