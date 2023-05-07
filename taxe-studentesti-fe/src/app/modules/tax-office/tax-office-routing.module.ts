// import { RouterModule, Routes } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { LimitFeesComponent } from "./pages/limit-fees/limit-fees.component";
// import { StudentsComponent } from "./pages/students/students.component";
// import {BacklogFeesComponent} from "./pages/backlog-fees/backlog-fees.component";
//
// const routes: Routes = [
//   {
//     path: 'studenti',
//     component: StudentsComponent
//   },
//   {
//     path: 'taxe-limita',
//     component: LimitFeesComponent
//   },
//   {
//     path: 'taxe-restante',
//     component: BacklogFeesComponent
//   }
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class TaxOfficeRoutingModule {}

// import {StudentsComponent} from "@/app/modules/tax-office/pages/students/students.component";
// import {LimitFeesComponent} from "@/app/modules/tax-office/pages/limit-fees/limit-fees.component";
// import {BacklogFeesComponent} from "@/app/modules/tax-office/pages/backlog-fees/backlog-fees.component";
// import AdministratorRoutes from "@/app/modules/administrator/administrator-routing.module";

const TaxOfficeRoutes = [
  {
    path: 'studenti',
    component: () => import('@/app/modules/tax-office/pages/students/index.vue')
  },
  {
    path: 'taxe-limita',
    component: () => import('@/app/modules/tax-office/pages/limit-fees/index.vue')
  },
  {
    path: 'taxe-restante',
    component: () => import('@/app/modules/tax-office/pages/backlog-fees/index.vue')
  }
];

export default TaxOfficeRoutes
