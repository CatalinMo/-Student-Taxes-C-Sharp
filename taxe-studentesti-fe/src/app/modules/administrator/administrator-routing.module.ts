// import { RouterModule, Routes } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { StudyFeesComponent } from "./pages/study-fees/study-fees.component";
// import { HostelFeesComponent } from "./pages/hostel-fees/hostel-fees.component";
// import { OtherFeesComponent } from "./pages/other-fees/other-fees.component";
// import { StudiesComponent } from "./pages/studies/studies.component";
// import { AccountsComponent } from "./pages/accounts/accounts.component";
//
// const routes: Routes = [
//   {
//     path: 'conturi',
//     component: AccountsComponent
//   },
//   {
//     path: 'studii',
//     component: StudiesComponent
//   },
//   {
//     path: 'taxe-studiu',
//     component: StudyFeesComponent
//   },
//   {
//     path: 'taxe-camin',
//     component: HostelFeesComponent
//   },
//   {
//     path: 'alte-taxe',
//     component: OtherFeesComponent
//   }
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class AdministratorRoutingModule {}


// import { AccountsComponent } from "@/app/modules/administrator/pages/accounts/accounts.component";
// import { StudiesComponent } from "@/app/modules/administrator/pages/studies/studies.component";
// import { StudyFeesComponent } from "@/app/modules/administrator/pages/study-fees/study-fees.component";
// import { HostelFeesComponent } from "@/app/modules/administrator/pages/hostel-fees/hostel-fees.component";
// import { OtherFeesComponent } from "@/app/modules/administrator/pages/other-fees/other-fees.component";

const AdministratorRoutes = [
  {
    path: 'conturi',
    component: () => import('@/app/modules/administrator/pages/accounts/index.vue')
  },
  {
    path: 'studii',
    component: () => import('@/app/modules/administrator/pages/studies/index.vue')
  },
  {
    path: 'taxe-studiu',
    component: () => import('@/app/modules/administrator/pages/study-fees/index.vue')
  },
  {
    path: 'taxe-camin',
    component: () => import('@/app/modules/administrator/pages/hostel-fees/index.vue')
  },
  {
    path: 'alte-taxe',
    component: () => import('@/app/modules/administrator/pages/other-fees/index.vue')
  }
]

export default AdministratorRoutes
