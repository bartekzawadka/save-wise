import axios from 'axios';
import ApiCalls from "../ApiCalls";
import Service from "./Service";

class ExpenseService extends Service {
    getExpenseCategories = () => {
        return axios.get(ApiCalls.getExpenseUrl() + '/categories', super.getRequestConfig());
    };

    addExpenseCategory = (category) => {
        return axios.post(ApiCalls.getExpenseUrl() + '/categories/add', category, super.getRequestConfig());
    };

    addExpense = (planId, expense) => {
        return axios.post(ApiCalls.getExpenseUrl() + "/" + planId, expense, super.getRequestConfig());
    };

    addExpenseCategoryType = (categoryId, type) => {
        return axios.post(ApiCalls.getExpenseUrl() + "/categories/"+categoryId+"/type", type, super.getRequestConfig());
    }
}

export default ExpenseService;
