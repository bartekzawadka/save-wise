import Config from './config';

const ApiCalls = {
    getPlansGetUrl: () => Config.apiUrl + '/plan',
    getPlansGetByIdUrl: (id) => Config.apiUrl + '/plan/' + id,
    getNewPlanIncomeCategoriesGetUrl: () => Config.apiUrl+'/plan/new',
    getIncomeCategoriesPostMultipleUrl: () => Config.apiUrl+"/category/income/multiple"
};

export default ApiCalls;
