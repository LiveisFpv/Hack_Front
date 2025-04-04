import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';

import HomeView from '@/components/HomeView.vue';
import TestTable from '@/components/TestTable.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
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
