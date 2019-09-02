import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CostGroup} from "../../../../models/budget/cost-group";
import {CostPositionInputMode} from "../../../../common/controls/cost-position-input/cost-position-input-mode";
import {Cost} from "../../../../models/budget/Cost";
import {Income} from "../../../../models/budget/Income";

@Component({
  selector: 'budget-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss']
})
export class ExpenseCategoriesComponent implements OnInit, OnChanges {

  public groups: CostGroup[] = [];
  public newGroupName = '';
  public summaryMode = CostPositionInputMode.summary;
  public expensesTotalSum = new Cost();
  public incomesTotalSum = new Cost();
  public leftToSpendTotalSum = new Cost();

  @Input()
  public incomes: Income[] = [];
  @Input() set setIncomes(value: Income[]) {
    console.log('Setting incomes...');
    console.log(value);
    this.incomes = value;
  }

  constructor() {
    this.expensesTotalSum.category = "Suma wydatków";
    this.incomesTotalSum.category = "Suma przychodów";
    this.leftToSpendTotalSum.category = "Pozostało do zagospodarowania";
  }

  ngOnInit() {
    this.calculate(true);
  }

  ngOnChanges(changes) {
    this.calculate(true);
  }

  onGroupAdded(){
    let group = new CostGroup();
    group.name = this.newGroupName;
    this.groups.push(group);
    this.newGroupName = '';
  }

  onGroupRemoved(index: number){
    this.groups.splice(index, 1);
    this.calculate();
  }

  onItemsChanged(group: Cost[], index: number){
    this.groups[index].costs = group;
    this.calculate();
  }

  private calculateExpensesGroupSum(groupIndex: number){
    let sum = 0.0;

    let group = this.groups[groupIndex];
    if(group && group.costs && group.costs.length > 0) {
      group.costs.forEach(value => {
        sum += value.amount;
      });

      this.groups[groupIndex].sum = sum;
    }
  }

  private calculateExpensesTotalSum(){
    let sum = 0.0;
    this.groups.forEach((value, index) => {
      this.calculateExpensesGroupSum(index);
      sum += this.groups[index].sum;
    });

    this.expensesTotalSum.amount = sum;
  }

  private calculateIncomesTotalSum(){
    if(!this.incomes || this.incomes.length == 0){
      this.incomesTotalSum.amount = 0.0;
      return;
    }

    let sum = 0.0;
    this.incomes.forEach(value => {
      sum += value.amount;
    });
    this.incomesTotalSum.amount = sum;
  }

  private calculateLeftToSpend(){
    this.leftToSpendTotalSum.amount = this.incomesTotalSum.amount - this.expensesTotalSum.amount;
  }

  private calculate(calculcateIncomes = false){
    this.calculateExpensesTotalSum();
    if(calculcateIncomes) {
      this.calculateIncomesTotalSum();
    }

    this.calculateLeftToSpend();
  }
}
