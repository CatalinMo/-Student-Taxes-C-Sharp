const AuthorizationRoutes = [
  {
    path: 'login',
    component: () => import('@/app/shared/modules/authorization/pages/authentication/index.vue')
  }
]

export default AuthorizationRoutes
