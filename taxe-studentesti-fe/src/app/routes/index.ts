import { createRouter, createWebHistory } from 'vue-router';
import { PublicRoutes } from './public-routes';

const router = createRouter({
    history: createWebHistory(),
    routes: [...PublicRoutes],
});

export default router;
