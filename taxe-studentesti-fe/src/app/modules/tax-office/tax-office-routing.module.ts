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
