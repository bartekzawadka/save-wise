import Config from 'config';

export const ApiCalls = {
    getPlansGetUrl: () => Config.apiUrl + '/plans',
    getPlansGetByIdUrl: (id) => Config.apiUrl + '/plans/' + id,
    getNewPlanIncomeCategoriesGetUrl: () => Config.apiUrl+'/plans/new'
};
