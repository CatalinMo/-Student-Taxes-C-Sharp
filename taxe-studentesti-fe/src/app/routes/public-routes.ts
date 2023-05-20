import {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from 'vue-router';
import MainContentComponent from '@/app/layout/main-layout/components/main-content/index.vue';

// import { AuthGuard } from "./shared/modules/authorization/guards/auth/auth.guard";
// import { RolesGuard } from "./shared/modules/authorization/guards/roles/roles.guard";
import { UserRole } from "@/app/shared/modules/authorization/enums/user-role";
// import { RolesGuard } from "@/app/shared/modules/authorization/guards/roles/roles.guard";
// import { AuthGuard } from "@/app/shared/modules/authorization/guards/auth/auth.guard";
import AuthenticationComponent from "@/app/shared/modules/authorization/pages/authentication/index.vue";
import AuthorizationModule from "@/app/shared/modules/authorization/authorization.module";
// import AdministratorRoutes from '@/app/modules/administrator/administrator-routing.module.ts'
import AuthorizationRoutes from '@/app/shared/modules/authorization/authorization-routing.module.ts'
// import ProfileRoutes from "@/app/modules/profile/profile-routing.module";
// import TaxOfficeRoutes from "@/app/modules/tax-office/tax-office-routing.module";
import StudentRoutes from "@/app/modules/student/student-routing.module";
import {AuthGuard} from "@/app/shared/modules/authorization/guards/auth/auth.guard";
import {
    AuthorizationServiceRepository
} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {RolesGuard} from "@/app/shared/modules/authorization/guards/roles/roles.guard";

export const PublicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/app/layout/main-layout/components/main-content/index.vue'),
        beforeEnter: AuthGuard.beforeRouteEnter,
        children: [
            {
                path: 'student',
                children: StudentRoutes,
                beforeEnter: RolesGuard.beforeRouteEnter,
                meta: {
                    roles: [UserRole.STUDENT]
                }
            },
            // {
            //     path: 'birou-taxe',
            //     component: () => import('./modules/tax-office/tax-office.module.vue'),
            //     children: TaxOfficeRoutes,
            //     // beforeEnter: RolesGuard,
            //     meta: {
            //         roles: [UserRole.TAX_OFFICE]
            //     }
            // },
            // {
            //     path: 'administrator',
            //     // beforeEnter: RolesGuard,
            //     meta: {
            //         roles: [UserRole.ADMIN]
            //     },
            //     children: AdministratorRoutes
            // },
            // {
            //     path: 'user',
            //     children: ProfileRoutes
            // }
        ]
    },
    {
        path: '/auth',
        children: AuthorizationRoutes
    }
];
