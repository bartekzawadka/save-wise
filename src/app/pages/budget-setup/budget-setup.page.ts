import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-budget-setup',
    templateUrl: './budget-setup.page.html',
    styleUrls: ['./budget-setup.page.scss'],
})
export class BudgetSetupPage implements OnInit {

    public title = "Nowy plan budżetowy";

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onFinish() {
        this.router.navigate(['/home']);
    }
}
