import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {PlanService} from "../services/plan.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router, private planService: PlanService){
    this.planService.getPlans();
    // if(!this.authService.getUser().IsAuthenticated){
    //   this.router.navigate(['/login']);
    // }
  }
}
