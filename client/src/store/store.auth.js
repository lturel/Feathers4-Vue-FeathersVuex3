// src/store/store.auth.js
/* eslint-disable no-unused-vars */

import feathersClient, { makeAuthPlugin } from '../feathers-client'; // from Github Feathers-Vuex docs

export default makeAuthPlugin({ userService: 'users' });
