import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {UserRole} from "@/app/shared/modules/authorization/enums/user-role";

export class RolesGuard {

  static beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const currentUserRole = AuthorizationServiceRepository.getCurrentUserValue().role;
    const requiredRoles: UserRole[] = to.meta.roles as UserRole[];
    if (requiredRoles.includes(currentUserRole)) {
      next();
    } else {
      console.log('%cAcces restricționat! Utilizatorul nu are drepturile necesare.', 'color: red;');
      next(false);
    }
  }
}
