import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cost} from "../../../models/budget/Cost";
import {CostPositionInputMode} from "../cost-position-input/cost-position-input-mode";

@Component({
  selector: 'costs-list',
  templateUrl: './costs-list.component.html',
  styleUrls: ['./costs-list.component.scss']
})
export class CostsListComponent implements OnInit {

  public incomes: Cost[] = [];
  public editMode = CostPositionInputMode.edit;

  @Input()
  public itemsListHeader: string = '';

  @Input()
  public newItemPlaceholder: string = 'Nazwa';

  @Output()
  public itemsChanged = new EventEmitter<Cost[]>();

  constructor() { }

  ngOnInit() {
  }

  onItemAdded(item: Cost){
    this.incomes.push(item);
    this.itemsChanged.emit(this.incomes);
  }

  modelChange(){
    this.itemsChanged.emit(this.incomes);
  }

  removeItem(index: number){
    this.incomes.splice(index, 1);
    this.itemsChanged.emit(this.incomes);
  }
}
