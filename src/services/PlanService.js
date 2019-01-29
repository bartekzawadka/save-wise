import axios from 'axios';
import ApiCalls from "../ApiCalls";
import Service from "./Service";

class PlanService extends Service {
    getCurrentPlan = () => {
        return axios.get(ApiCalls.getPlanUrl() + '/current', super.getRequestConfig());
    };

    getNewPlan = () => {
        return axios.get(ApiCalls.getPlanUrl() + '/new', super.getRequestConfig());
    };

    getPlan = (planId) => {
        return axios.get(ApiCalls.getPlanUrl() + '/' + planId, super.getRequestConfig());
    };

    getPlanSummary = (planId) => {
        return axios.get(ApiCalls.getPlanUrl() + '/' + planId + '/summary', super.getRequestConfig());
    };

    getPlans = (filter) => {
      return axios.post(ApiCalls.getPlanUrl()+'/list', filter, super.getRequestConfig());
    };

    addNewPlan = (plan) => {
        return axios.post(ApiCalls.getPlanUrl(), plan, super.getRequestConfig());
    };

    updatePlan = (planId, plan) => {
        return axios.put(ApiCalls.getPlanUrl() + '/' + planId, plan, super.getRequestConfig());
    };

    deletePlan = (planId) => {
        return axios.delete(ApiCalls.getPlanUrl() + '/' + planId, super.getRequestConfig());
    };

    getPlanIncomes = (planId) => {
        return axios.get(ApiCalls.getPlanUrl() + '/' + planId + '/incomes', super.getRequestConfig());
    };

    setPlanIncomes = (planId, incomes) => {
        return axios.put(ApiCalls.getPlanUrl() + '/' + planId + '/incomes', incomes, super.getRequestConfig());
    }
}

export default PlanService;
