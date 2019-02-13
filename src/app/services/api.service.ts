import { environment } from '../../environments/environment';

export abstract class ApiService {
  protected CallApi<T>(action: (apiUrl: string) => Promise<T>) : Promise<T>{
    return action(environment.apiUrl);
  }
}
