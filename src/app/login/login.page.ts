import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../models/user/LoginModel";
import {AuthService} from "../services/auth.service";
import {NavController} from "@ionic/angular";
import {User} from "../models/user/User";
import {RegistrationModel} from "../models/user/RegistrationModel";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginData: LoginModel = new LoginModel();
    regData: RegistrationModel = new RegistrationModel();
    errorMessage: string;
    showError = false;

    constructor(private authService: AuthService, private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    login() {
        this.showError = false;
        this.handleAuthResponse(this.authService.logIn(this.loginData));
    }

    register() {
        this.showError = false;

        this.handleAuthResponse(this.authService.register(this.regData));
    }

    private handleAuthResponse(promise: Promise<User>) {
        promise.then(() => {
            this.navCtrl.navigateRoot('/')
                .then(() => {
                    location.reload();
                })
        }).catch(e => {
            let error = '';

            if (Array.isArray(e.error.error)) {
                for (let k in e.error.error) {
                    error += e.error.error[k] + ". "
                }
            } else {
                error = e.error.error;
            }

            this.errorMessage = error;
            this.showError = true;
        });
    }
}
