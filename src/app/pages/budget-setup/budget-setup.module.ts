import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BudgetSetupPage } from './budget-setup.page';
import {BudgetPeriodComponent} from "../../budget/setup/components/budget-period/budget-period.component";
import {WizardModule} from "../../common/wizard/wizard.module";

const routes: Routes = [
  {
    path: '',
    component: BudgetSetupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      WizardModule
  ],
  declarations: [BudgetSetupPage, BudgetPeriodComponent]
})
export class BudgetSetupPageModule {}
