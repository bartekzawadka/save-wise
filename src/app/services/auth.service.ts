import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../models/user/User";
import {LoginModel} from "../models/user/LoginModel";
import {ApiService} from "./api.service";

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
        if (this.loggedUser.IsAuthenticated) {
            return this.loggedUser;
        }

        this.loggedUser = new User();

        let value = localStorage.getItem(this.USER_STORAGE_KEY);
        if (value) {
            let user = JSON.parse(value);
            this.loggedUser.username = user.username;
            this.loggedUser.token = user.token;
        }

        return this.loggedUser;
    }

    public logOff() {
        this.loggedUser = new User();
        localStorage.removeItem(this.USER_STORAGE_KEY);
    }

    public logIn(loginData: LoginModel): Promise<User> {
        return super.CallApi(apiUrl => {
            return this.http.post<User>(apiUrl, loginData)
                .toPromise()
                .then(value => {
                    console.log('LOGIN VALUE:');
                    console.log(value);

                    if(value){
                        this.loggedUser.token = value.token;
                        this.loggedUser.username = value.username;
                    }

                    return value;
                });
        });
    }
}
