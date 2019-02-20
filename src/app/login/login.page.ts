import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../models/user/LoginModel";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginData: LoginModel = new LoginModel();
    errorMessage: string;
    showError = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    submit() {
        this.showError = false;

        this.authService.logIn(this.loginData)
            .then(data =>{
                return this.router.navigate(['/']);
            })
            .catch(e => {
                this.errorMessage = e.error.error;
                this.showError = true;
            })
    }
}
