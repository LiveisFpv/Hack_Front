import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';

import HomePage from '@/components/HomePage.vue';
import TestTable from '@/components/TestTable.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/suggest/ya-token',
    name: 'ya-token',
    component: HomePage,
    props: (route) => ({ ...route.query, ...route.params }),
  },
  {
    path: '/test-table',
    name: 'test-table',
    component: TestTable,
    props: (route) => ({ ...route.query, ...route.params }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
