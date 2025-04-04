import { createApp } from 'vue';
declare module 'vite-tsconfig-paths' {
  
}
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import 'normalize.css';
import '@/styles/style.scss';
import '@/side/yaSide.js';
import App from './App.vue';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import router from '@/router';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.provide(USER_PROVIDE_SYMBOL, useAuthStore());
app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
