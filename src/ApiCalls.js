import Config from './config';

const ApiCalls = {
    getPlanUrl: () => Config.apiUrl + '/plan',
    getPlansGetByIdUrl: (id) => Config.apiUrl + '/plan/' + id,
    getNewPlanGetUrl: () => Config.apiUrl+'/plan/new',
    getIncomeCategoriesPostMultipleUrl: () => Config.apiUrl+"/category/income/multiple"
};

export default ApiCalls;
