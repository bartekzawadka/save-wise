import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {BudgetSetupPage} from './budget-setup.page';
import {BudgetPeriodComponent} from "../../budget/setup/components/budget-period/budget-period.component";
import {WizardModule} from "../../common/wizard/wizard.module";
import {IncomeCategoriesComponent} from "../../budget/setup/components/income-categories/income-categories.component";
import {CostPositionInputComponent} from "../../common/controls/cost-position-input/cost-position-input.component";
import {NgAutonumericModule} from "@angularfy/ng-autonumeric";
import {CostsListComponent} from "../../common/controls/costs-list/costs-list.component";
import {ExpenseCategoriesComponent} from "../../budget/setup/components/expense-categories/expense-categories.component";;

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
        WizardModule,
        NgAutonumericModule
    ],
    declarations: [
        BudgetSetupPage,
        BudgetPeriodComponent,
        IncomeCategoriesComponent,
        ExpenseCategoriesComponent,
        CostsListComponent,
        CostPositionInputComponent]
})
export class BudgetSetupPageModule {
}
