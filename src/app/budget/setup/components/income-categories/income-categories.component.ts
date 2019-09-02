import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cost} from "../../../../models/budget/Cost";
import {CostPositionInputMode} from "../../../../common/controls/cost-position-input/cost-position-input-mode";
import {Income} from "../../../../models/budget/Income";
import {BudgetIncomesChangedEventArgs} from "../../../../models/events/budget-incomes-changed-event-args";

@Component({
    selector: 'budget-income-categories',
    templateUrl: './income-categories.component.html',
    styleUrls: ['./income-categories.component.scss']
})
export class IncomeCategoriesComponent implements OnInit {
    @Input()
    public incomes: Income[] = [];

    public costs: Cost[] = [];

    @Output()
    public itemsChanged = new EventEmitter();

    public summaryModel = new Cost();
    public summaryMode = CostPositionInputMode.summary;

    constructor() {
        this.summaryModel.category = "Suma";
    }

    ngOnInit() {
        if(this.incomes && this.incomes.length > 0){
            this.costs = this.incomes.map(value => {
                let cost = new Cost();
                cost.amount = value.plannedAmount;
                cost.id = value.id;
                cost.category = value.category;
                return cost;
            })
        }
    }

    onItemsChanged(items: Cost[]) {
        if (!items || items.length === 0) {
            this.summaryModel.amount = 0.0;
            this.incomes = [];
        } else {
            let sum = 0.0;
            items.forEach(value => sum += value.amount);
            this.summaryModel.amount = sum;

            let incomes = [];
            items.forEach((value) => {
                let income = new Income();
                income.plannedAmount = value.amount;
                income.category = value.category;
                income.id = value.id;
                income.amount = value.amount;
                incomes.push(income);
            });

            this.incomes = incomes;
        }

        this.itemsChanged.emit(new BudgetIncomesChangedEventArgs(this.incomes, this.summaryModel.amount));
    }
}
