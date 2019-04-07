import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Budget} from "../../models/budget/Budget";
import {BudgetPeriodComponent} from "../../budget/setup/components/budget-period/budget-period.component";
import {MessageService} from "../../common/dialog/message/message.service";

@Component({
    selector: 'app-budget-setup',
    templateUrl: './budget-setup.page.html',
    styleUrls: ['./budget-setup.page.scss'],
})
export class BudgetSetupPage implements OnInit {
    @ViewChild(BudgetPeriodComponent) budgetPeriod: BudgetPeriodComponent;

    public title = "Nowy plan budżetowy";
    public budget = new Budget();

    constructor(private router: Router, private messageService: MessageService) {
    }

    ngOnInit() {
    }

    onValidationFailed(error: string) {
        this.messageService.showMessage(error, "Nieprawidłowe daty").then();
    }

    isPeriodValid(): string {
        if (!this.budget.startDate || !this.budget.endDate) {
            return "Daty początku i końca okresu nie zostały określone";
        }

        let dateFromDate = new Date(this.budget.startDate);
        let dateToDate = new Date(this.budget.endDate);

        if (dateToDate <= dateFromDate) {
            return "Data końcowa nie może być wcześniejsza lub równa dacie początkowej";
        }

        return "";
    }

    onFinish() {
        this.router.navigate(['/home']);
    }
}
