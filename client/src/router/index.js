import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Secret from "../views/Secret.vue";
//import About from '../views/About.vue';

import store from "../store/index";

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      store
        .dispatch("auth/authenticate")
        .then(() => {
          next("/about");
        })
        .catch((e) => {
          next("/login");
        });
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter(to, from, next) {
      store
        .dispatch("auth/authenticate")
        .then(() => {
          next();
        })
        .catch((e) => {
          next("/login");
        });
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/secret",
    name: "secret",
    component: Secret,
    beforeEnter(to, from, next) {
      store
        .dispatch("auth/authenticate")
        .then(() => {
          next();
        })
        .catch((e) => {
          next("/login");
        });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
