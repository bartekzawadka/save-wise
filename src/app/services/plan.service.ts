import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlanService extends ApiService {
    constructor(private http: HttpClient) {
        super();
    }

    getPlans() {
        return this.CallApi(url => {
            return this.http.get(url + '/plan/list').toPromise();
        });
    }
}
