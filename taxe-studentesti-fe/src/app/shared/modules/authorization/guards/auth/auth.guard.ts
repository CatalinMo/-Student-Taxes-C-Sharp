import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";

export class AuthGuard {

    static beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
        const currentToken = AuthorizationServiceRepository.getCurrentTokenValue();
        if (currentToken) {
            next();
        } else {
            next('/auth/login');
        }
    }
}
