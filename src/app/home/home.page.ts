import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {PlanService} from "../services/plan.service";
import {LoaderService} from "../common/dialog/loader/loader.service";
import {MessageService} from "../common/dialog/message/message.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public budget: Budget;

    constructor(private authService: AuthService,
                private router: Router,
                private planService: PlanService,
                private loaderService: LoaderService,
                private messageService: MessageService) {
        this.loaderService.runAsync(() => this.planService.getCurrentPlan()).then(data => {
            console.log(data);
            if(!data){
                return;
            }

            this.budget = data;
        })
            .catch(e=>{
                console.log(e);
            });
    }
}
