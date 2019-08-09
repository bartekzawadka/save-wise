import { Component, OnInit } from '@angular/core';
import {CostGroup} from "../../../../models/budget/cost-group";

@Component({
  selector: 'budget-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss']
})
export class ExpenseCategoriesComponent implements OnInit {

  public groups: CostGroup[] = [];
  public newGroupName = '';

  constructor() { }

  ngOnInit() {
  }

  onGroupAdded(){
    let group = new CostGroup();
    group.name = this.newGroupName;
    this.groups.push(group);
    this.newGroupName = '';
  }
}
