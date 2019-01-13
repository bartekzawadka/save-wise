import Config from './config';

const ApiCalls = {
    getPlanUrl: () => Config.apiUrl + '/plan',
    getCategoryUrl: () => Config.apiUrl+ '/category',
    getUserUrl: () => Config.apiUrl+'/user',
    getExpenseUrl: () => Config.apiUrl+'/expense'
};

export default ApiCalls;
