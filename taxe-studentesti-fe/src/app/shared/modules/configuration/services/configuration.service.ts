import axios, {AxiosResponse, AxiosError} from 'axios';
import * as environmentLocal from '../../../../../environments/environment.local';

export class ConfigurationService {

    private CONFIG_URL = '';
    private appConfig: any;

    constructor() {
        this.setConfigUrl();
    }

    loadConfig(): Promise<boolean | any> {
        return new Promise(((resolve, reject) => {
            return axios.get<any, AxiosResponse<Object>>(this.CONFIG_URL)
              .then((conf: AxiosResponse<Object>) => {
                this.appConfig = conf.data;
                resolve(true);
              })
              .catch((error: AxiosError) => {
                reject(error);
              })
          }));
    }

    getConfig() {
        return this.appConfig;
    }

    private setConfigUrl() {
        let hostname = window && window.location && window.location.hostname;

        if (hostname === 'localhost') {
            this.CONFIG_URL = environmentLocal.environment.basePath + environmentLocal.environment.configFile;
        }
    }

}
