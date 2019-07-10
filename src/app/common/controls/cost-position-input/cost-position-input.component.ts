import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LocalizationSettings} from "../../localization.settings";
import {IonInput} from "@ionic/angular";
import {Cost} from "../../../models/budget/Cost";

@Component({
  selector: 'cost-position-input',
  templateUrl: './cost-position-input.component.html',
  styleUrls: ['./cost-position-input.component.scss']
})
export class CostPositionInputComponent implements OnInit {

  public options: any;

  @Input()
  public cost = new Cost();

  @ViewChild(IonInput) input;

  @Input()
  public namePlaceHolder: string;

  @Input()
  public isDisplayOnly = false;

  @Input()
  public index: number;

  @Output()
  buttonClick = new EventEmitter<Cost>();

  constructor(private localizationSettings: LocalizationSettings) {
    this.options = localizationSettings.currencyOptions;
  }

  ngOnInit() {
  }

  positionAdd(){
    this.buttonClick.emit(this.cost);
    this.cost = new Cost();
  }

  positionRemove(){
    this.buttonClick.emit(this.cost);
  }
}
