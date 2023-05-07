import { InternalAxiosRequestConfig } from 'axios';
import { AuthorizationServiceRepository } from '../services/authorization/authorization.service.repository';
import { Router } from 'vue-router';
import { ConfigurationService } from '../../configuration/services/configuration.service';

export class AuthorizationInterceptor {
    public configuration: any;

    constructor(
        private router: Router,
        private configurationService: ConfigurationService
    ) {
        this.configuration = this.configurationService.getConfig();
    }

    async intercept(request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
        const token = AuthorizationServiceRepository.getCurrentTokenValue();

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    }

   async onRejected(error: any) {
        if (error.response?.status === 401) {
            await this.router.push('/auth/login');
        }
    }
}
