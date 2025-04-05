import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';

import HomePage from '@/components/HomePage.vue';
import TrainingPlan from '@/components/TrainingPlan.vue';
import ProfileForm from '@/components/auth/ProfileForm.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/suggest/ya-token',
    name: 'ya-token',
    component: HomePage,
    props: (route) => ({ ...route.query, ...route.params }),
  },
  {
    path: '/training-plan',
    name: 'training-plan',
    component: TrainingPlan,
    props: (route) => ({ ...route.query, ...route.params }),
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
