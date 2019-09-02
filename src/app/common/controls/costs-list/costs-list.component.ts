import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cost} from "../../../models/budget/Cost";
import {CostPositionInputMode} from "../cost-position-input/cost-position-input-mode";

@Component({
  selector: 'costs-list',
  templateUrl: './costs-list.component.html',
  styleUrls: ['./costs-list.component.scss']
})
export class CostsListComponent implements OnInit {

  @Input()
  public costs: Cost[] = [];
  public editMode = CostPositionInputMode.edit;

  @Input()
  public itemsListHeader: string = '';

  @Input()
  public newItemPlaceholder: string = 'Nazwa';

  @Input()
  public showBottomLineForNewItemInput = true;

  @Output()
  public itemsChanged = new EventEmitter<Cost[]>();

  constructor() { }

  ngOnInit() {
  }

  onItemAdded(item: Cost){
    this.costs.push(item);
    this.itemsChanged.emit(this.costs);
  }

  modelChange(){
    this.itemsChanged.emit(this.costs);
  }

  removeItem(index: number){
    this.costs.splice(index, 1);
    this.itemsChanged.emit(this.costs);
  }
}
