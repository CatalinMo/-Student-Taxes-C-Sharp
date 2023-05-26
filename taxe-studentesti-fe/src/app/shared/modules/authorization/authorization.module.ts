import { App } from 'vue';
import { AuthorizationServiceRepository } from "./services/authorization/authorization.service.repository";
import { AuthAdapter } from './model-adapters/auth.adapter';
import { ConfigurationService } from '../configuration/services/configuration.service';
import { UserAdapter } from './model-adapters/user.adapter';
import {AuthorizationInterceptor} from "@/app/shared/modules/authorization/interceptors/authorization.interceptor.ts";
import axios from "axios/index";
import router from "@/app/routes";

export default {
    install: async (app: App) => {
        const configService = new ConfigurationService();
        await configService.loadConfig();

        app.provide('authorizationService', new AuthorizationServiceRepository(new AuthAdapter(new UserAdapter), configService));

        const authInterceptor = new AuthorizationInterceptor(router, configService);
        axios.interceptors.request.use((config) => authInterceptor.intercept(config), (error) => authInterceptor.onRejected(error));
    }
}
