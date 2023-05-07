// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AuthorizationRoutingModule } from "./authorization-routing.module";
// import { AuthenticationComponent } from "./pages/authentication/authentication.component";
// import {AuthGuard} from "./guards/auth/auth.guard";
// import {AuthorizationServiceRepository} from "./services/authorization/authorization.service.repository";
// import {AuthAdapter} from "./model-adapters/auth.adapter";
// import {UserAdapter} from "./model-adapters/user.adapter";
// import {AuthorizationInterceptor} from "./interceptors/authorization.interceptor";
// import {HTTP_INTERCEPTORS} from "@angular/common/http";
// import {AuthViewAdapter} from "./model-adapters/auth.view.adapter";
// import {RolesGuard} from "./guards/roles/roles.guard";
// import {UserViewAdapter} from "./model-adapters/user.view.adapter";

// @NgModule({
//   declarations: [
//     AuthenticationComponent
//   ],
//   imports: [
//     CommonModule,
//     AuthorizationRoutingModule,
//     ReactiveFormsModule
//   ],
//   providers: [
//     AuthorizationInterceptor,
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthorizationInterceptor,
//       multi: true
//     },
//     AuthorizationServiceRepository,
//     AuthAdapter,
//     AuthViewAdapter,
//     UserAdapter,
//     UserViewAdapter,
//     AuthGuard,
//     RolesGuard
//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class AuthorizationModule {
// }

// import { Options, Vue } from 'vue-class-component';
// import { AuthorizationServiceRepository } from "./services/authorization/authorization.service.repository";
// import AuthenticationComponent from "./pages/authentication/authentication.component";
// import { AuthAdapter } from './model-adapters/auth.adapter';
// import { ConfigurationService } from '../configuration/services/configuration.service';
// import { UserAdapter } from './model-adapters/user.adapter';

// @Options({
//     name: 'AuthorizationModule'
//   })
// export default class AuthorizationModule extends Vue {

//   // register AuthenticationComponent as a local component
//   components = {
//     AuthenticationComponent
//   }

//   // register authorizationService as a local provider
//   provide() {
//     const authorizationService = new AuthorizationServiceRepository(new AuthAdapter(new UserAdapter), new ConfigurationService);
//     return {
//         authorizationService
//     }
// }

//   static install(app: any) {
//     app.component('authentication-component', AuthenticationComponent);
//     app.provide('AuthorizationServiceRepository', AuthorizationServiceRepository);
//   }
// }

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
