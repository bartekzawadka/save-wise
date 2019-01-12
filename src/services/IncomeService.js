import axios from 'axios';
import ApiCalls from "../ApiCalls";
import Service from "./Service";

class IncomeService extends Service {
    getIncomeCategories = () => {
        return axios.get(ApiCalls.getCategoryUrl()+'/income', super.getRequestConfig());
    }
}

export default IncomeService;
