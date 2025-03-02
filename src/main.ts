import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';
import useAuthStore, { USER_PROVIDE_SYMBOL } from './store/useAuthStore';

const app = createApp(App);
app.use(ElementPlus);
app.provide(USER_PROVIDE_SYMBOL, useAuthStore());
app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
