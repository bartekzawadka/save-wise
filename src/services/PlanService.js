import axios from 'axios';
import ApiCalls from "../ApiCalls";
import Service from "./Service";

class PlanService extends Service {
    getCurrentPlan = () => {
        return axios.get(ApiCalls.getPlanUrl()+'/current', super.getRequestConfig());
    };

    getNewPlan = () => {
        return axios.get(ApiCalls.getPlanUrl()+'/new', super.getRequestConfig())
    };

    addNewPlan = (plan) => {
        return axios.post(ApiCalls.getPlanUrl(), plan, super.getRequestConfig());
    }
}

export default PlanService;
