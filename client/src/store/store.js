// src/store/store.js
import Vue from 'vue';
import Vuex from 'vuex';
import { FeathersVuex } from 'feathers-vuex';
import auth from './store.auth';

Vue.use(Vuex);
Vue.use(FeathersVuex);

// Require the entire folder of service plugins with WEBPACK !!!
// =======================================================================
// const requireModule = require.context('./services', false, /.js$/);
// const servicePlugins = requireModule
//   .keys()
//   .map(modulePath => requireModule(modulePath).default);
// =======================================================================

// Or you can import them manually for Rollup, etc.
import users from './services/users';

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [
    // ...servicePlugins, // if you're using require.context, spread the plugins into the array.
    users, // if you're manually importing, just add the plugins into the array, like this
    auth,
  ],
});
