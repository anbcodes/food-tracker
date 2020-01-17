import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';
import Edit from '../views/Edit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/goals',
    name: 'edit',
    component: Edit,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
