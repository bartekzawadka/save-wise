import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../models/user/User";
import {LoginModel} from "../models/user/LoginModel";
import {ApiService} from "./api.service";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    private loggedUser = new User();
    private USER_STORAGE_KEY = "user";

    constructor(private http: HttpClient) {
        super();
    }

    public getUser(): User {
        if (this.loggedUser.isAuthenticated()) {
            return this.loggedUser;
        }

        this.loggedUser = new User();

        let value = localStorage.getItem(this.USER_STORAGE_KEY);
        if (value) {
            let user = JSON.parse(value);
            this.loggedUser = this.extractUserInfo(user);
        }

        return this.loggedUser;
    }

    public logOff() {
        this.loggedUser = new User();
        localStorage.removeItem(this.USER_STORAGE_KEY);
    }

    public logIn(loginData: LoginModel): Promise<User> {
        return super.CallApi(apiUrl => {
            return this.http.post<User>(apiUrl + "/user/authenticate", loginData)
                .pipe(
                    tap(value => {
                        this.processTokenData(value);
                    })
                )
                .toPromise();
        });
    }

    public register(regData: LoginModel): Promise<User> {
        return super.CallApi(apiUrl => {
            return this.http.post<User>(apiUrl + "/user/register", regData)
                .toPromise()
                .then(data => {
                    this.processTokenData(data);
                    return data;
                });
        })
    }

    public refreshToken() {
        return super.CallApi(apiUrl => {
            return this.http.get(apiUrl + "/user/refreshToken")
                .toPromise()
                .then(value => {
                    return this.processTokenData(value);
                })
        })
    }

    private processTokenData(value: any) {
        if (value) {
            this.loggedUser = this.extractUserInfo(value);
            localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(value));
        }

        return value;
    }

    private extractUserInfo(data) {
        let userInfo = new User();
        userInfo.token = data.token;
        userInfo.expires = data.expires;
        userInfo.id = data.id;
        userInfo.username = data.username;

        return userInfo;
    }
}
