import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './page/Home.vue';
import Favorites from './page/Favorites.vue';
import i18n from './translations/i18n';

const app = createApp(App);
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHistory('/SneakerVue/'),
  routes,
});

app.use(router);
app.use(autoAnimatePlugin);
app.use(i18n);
app.mount('#app');
