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
