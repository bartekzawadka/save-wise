import axios from 'axios';
import ApiCalls from "../ApiCalls";
import Service from "./Service";

class ExpenseService extends Service {
    getExpenseCategories = () => {
        return axios.get(ApiCalls.getCategoryUrl() + '/expense', super.getRequestConfig());
    };

    getExpense = (planId, expenseId) => {
        return axios.get(ApiCalls.getExpenseUrl() + "/" + planId + "/" + expenseId, super.getRequestConfig());
    };

    upsertExpense = (planId, expense, expenseId) => {
        if (planId && expenseId) {
            return axios.put(ApiCalls.getExpenseUrl() + "/" + planId + "/" + expenseId,
                expense,
                super.getRequestConfig());
        }
        return axios.post(ApiCalls.getExpenseUrl() + "/" + planId, expense, super.getRequestConfig());
    };

    deleteExpense = (planId, expenseId) => {
        return axios.delete(ApiCalls.getExpenseUrl() + '/' + planId + '/' + expenseId, super.getRequestConfig());
    };

    getExpenses = (planId, searchData) => {
        return axios.post(ApiCalls.getExpenseUrl() + "/list/" + planId, searchData, super.getRequestConfig());
    };
}

export default ExpenseService;
