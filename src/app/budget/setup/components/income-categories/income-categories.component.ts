import {Component, OnInit} from '@angular/core';
import {Cost} from "../../../../models/budget/Cost";

@Component({
  selector: 'budget-income-categories',
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.scss']
})
export class IncomeCategoriesComponent implements OnInit {

  public incomes: Cost[] = [];

  constructor() { }

  ngOnInit() {
  }

  onItemAdded(item: Cost){
    this.incomes.push(item);
  }

  removeItem(index: number){
    this.incomes.splice(index, 1);
  }
}
