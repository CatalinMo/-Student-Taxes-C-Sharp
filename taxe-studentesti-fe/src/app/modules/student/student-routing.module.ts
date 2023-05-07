const StudentRoutes = [
  {
    path: 'taxe-active',
    component: () => import('@/app/modules/student/pages/active-fees/index.vue')
  },
  {
    path: 'taxe-platite',
    component: () => import('@/app/modules/student/pages/paid-fees/index.vue')
  },
  {
    path: 'studii-active',
    component: () => import('@/app/modules/student/pages/student-studies/index.vue')
  }
];

export default StudentRoutes
