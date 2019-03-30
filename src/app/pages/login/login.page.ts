import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../../models/user/LoginModel";
import {AuthService} from "../../services/auth.service";
import {NavController} from "@ionic/angular";
import {User} from "../../models/user/User";
import {RegistrationModel} from "../../models/user/RegistrationModel";
import {LoaderService} from "../../common/dialog/loader/loader.service";
import {MessageService} from "../../common/dialog/message/message.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginData: LoginModel = new LoginModel();
    regData: RegistrationModel = new RegistrationModel();

    constructor(private authService: AuthService,
                private navCtrl: NavController,
                private loaderService: LoaderService,
                private messageService: MessageService) {
    }

    ngOnInit() {
    }

    async login() {
        await this.handleAuthResponse(
            this.loaderService.runAsync(() => this.authService.logIn(this.loginData)));
    }

    async register() {
        await this.handleAuthResponse(this.authService.register(this.regData));
    }

    private async handleAuthResponse(promise: Promise<User>) {
        promise.then(() => {
            this.navCtrl.navigateRoot('/')
                .then(() => {
                    location.reload();
                })
        }).catch(async e => {
            let error = '';

            if (Array.isArray(e.error.error)) {
                for (let k in e.error.error) {
                    if (e.error.error.hasOwnProperty(k)) {
                        error += e.error.error[k] + ". "
                    }
                }
            } else {
                error = e.error.error;
            }

            await this.messageService.showMessage(error);
        });
    }
}
