import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Secret from './views/Secret.vue';
import About from './views/About.vue';

import store from './store/store';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store
          .dispatch('auth/authenticate')
          .then(() => {
            next('/about');
          })
          .catch(e => {
            next('/login');
          });
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter(to, from, next) {
        store
          .dispatch('auth/authenticate')
          .then(() => {
            next();
          })
          .catch(e => {
            next('/login');
          });
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/secret',
      name: 'secret',
      component: Secret,
      beforeEnter(to, from, next) {
        store
          .dispatch('auth/authenticate')
          .then(() => {
            next();
          })
          .catch(e => {
            next('/login');
          });
      },
    },
  ],
});
