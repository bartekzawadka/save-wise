import {Income} from "../budget/Income";

export class BudgetIncomesChangedEventArgs {
    public incomes: Income[] = [];
    public sum = 0.0;

    constructor(incomes: Income[], sum: number){
        this.incomes = incomes;
        this.sum = sum;
    }
}
