import {RouteRecordRaw} from 'vue-router';

import { UserRole } from "@/app/shared/modules/authorization/enums/user-role";
import AuthorizationRoutes from '@/app/shared/modules/authorization/authorization-routing.module.ts'
import StudentRoutes from "@/app/modules/student/student-routing.module";
import AdministratorRoutes from "@/app/modules/administrator/administrator-routing.module";
import TaxOfficeRoutes from "@/app/modules/tax-office/tax-office-routing.module";
import ProfileRoutes from "@/app/modules/profile/profile-routing.module";
import {AuthGuard} from "@/app/shared/modules/authorization/guards/auth/auth.guard";
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
            {
                path: 'birou-taxe',
                children: TaxOfficeRoutes,
                beforeEnter: RolesGuard.beforeRouteEnter,
                meta: {
                    roles: [UserRole.TAX_OFFICE]
                }
            },
            {
                path: 'administrator',
                beforeEnter: RolesGuard.beforeRouteEnter,
                meta: {
                    roles: [UserRole.ADMIN]
                },
                children: AdministratorRoutes
            },
            {
                path: 'user',
                children: ProfileRoutes
            }
        ]
    },
    {
        path: '/auth',
        children: AuthorizationRoutes
    }
];
