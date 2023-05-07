// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import {MainContentComponent} from "./layout/main-layout/components/main-content/main-content.component";
// import { AuthGuard } from "./shared/modules/authorization/guards/auth/auth.guard";
// import {RolesGuard} from "./shared/modules/authorization/guards/roles/roles.guard";
// import {UserRole} from "./shared/modules/authorization/enums/user-role";
//
// const routes: Routes = [
//   {
//     path: '',
//     component: MainContentComponent,
//     canActivate: [AuthGuard],
//     runGuardsAndResolvers: 'always',
//     children: [
//       {
//         path: 'student',
//         loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
//         canActivate: [RolesGuard],
//         data: {
//           roles: [UserRole.STUDENT]
//         }
//       },
//       {
//         path: 'birou-taxe',
//         loadChildren: () => import('./modules/tax-office/tax-office.module').then(m => m.TaxOfficeModule),
//         canActivate: [RolesGuard],
//         data: {
//           roles: [UserRole.TAX_OFFICE]
//         }
//       },
//       {
//         path: 'administrator',
//         loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule),
//         canActivate: [RolesGuard],
//         data: {
//           roles: [UserRole.ADMIN]
//         }
//       },
//       {
//         path: 'user',
//         loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
//       }
//     ]
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./shared/modules/authorization/authorization.module').then(m => m.AuthorizationModule)
//   }
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

// import { createRouter, createWebHistory } from 'vue-router'
// // import MainContentComponent from './components/MainContentComponent.vue'
// import RolesGuard from './guards/RolesGuard.vue'
// import AuthGuard from './guards/AuthGuard.vue'
// import { UserRole } from "@/app/shared/modules/authorization/enums/user-role";
//
// import AdministratorRoutes from '@/app/modules/administrator/administrator-routing.module.ts'
// import MainContentComponent from "@/app/layout/main-layout/components/main-content/main-content.component";
//
// const routes = [
//     {
//         path: '/',
//         component: MainContentComponent,
//         redirect: '/',
//         beforeEnter: AuthGuard,
//         children: [
//             {
//                 path: 'student',
//                 component: () => import('./modules/student/student.module.vue'),
//                 beforeEnter: RolesGuard,
//                 meta: {
//                     roles: [UserRole.STUDENT]
//                 }
//             },
//             {
//                 path: 'birou-taxe',
//                 component: () => import('./modules/tax-office/tax-office.module.vue'),
//                 beforeEnter: RolesGuard,
//                 meta: {
//                     roles: [UserRole.TAX_OFFICE]
//                 }
//             },
//             {
//                 path: 'administrator',
//                 component: () => import('./modules/administrator/administrator.module.vue'),
//                 beforeEnter: RolesGuard,
//                 meta: {
//                     roles: [UserRole.ADMIN]
//                 },
//                 children: [...AdministratorRoutes]
//             },
//             {
//                 path: 'user',
//                 component: () => import('./modules/profile/profile.module.vue')
//             }
//         ]
//     },
//     {
//         path: 'auth',
//         component: () => import('./shared/modules/authorization/authorization-routing.module')
//     }
// ]
//
// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })
//
// export default router
