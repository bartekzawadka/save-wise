import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Budget} from "../models/budget/Budget";

@Injectable({
    providedIn: 'root'
})
export class PlanService extends ApiService {
    constructor(private http: HttpClient) {
        super();
    }

    getPlans() {
        return this.CallApi(url => {
            return this.http.post(url + '/plan/list', null, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }).toPromise();
        });
    }

    getCurrentPlan() : Promise<Budget> {
        return this.CallApi(url => {
            return this.http.get<Budget>(url + '/plan/current').toPromise();
        })
    }
}
