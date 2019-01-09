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

    addExpenseCategoryType = (categoryId, type) => {
        return axios.post(ApiCalls.getExpenseUrl() + "/categories/" + categoryId + "/type", type, super.getRequestConfig());
    };

    getExpenses = (planId, searchData) => {
        return axios.post(ApiCalls.getExpenseUrl() + "/list/" + planId, searchData, super.getRequestConfig());
    };
}

export default ExpenseService;
