import axios from 'axios';
import ApiCalls from "../ApiCalls";
import Service from "./Service";

class ExpenseService extends Service {
    getExpenseCategories = () => {
        return axios.get(ApiCalls.getExpenseUrl() + '/categories', super.getRequestConfig());
    };

    addExpense = (planId, expense) => {
        return axios.post(ApiCalls.getExpenseUrl()+"/"+planId, expense, super.getRequestConfig());
    }
}

export default ExpenseService;
