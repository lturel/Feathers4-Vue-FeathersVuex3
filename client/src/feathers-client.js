// src/feathers-client.js

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authClient from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import feathersVuex from 'feathers-vuex'; // or '@/libs/feathers-vuex' if you're copying feathers-vuex as mentioned earlier.
import { iff, discard } from 'feathers-hooks-common';

// Setup the Feathers client
const host = 'http://localhost:3030'; // process.env.VUE_APP_API_URL
const socket = io(host, { transports: ['websocket'] });
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(authClient({ storage: window.localStorage }))

  // Issue #266
  .hooks({
    before: {
      all: [
        iff(
          context => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp'),
        ),
      ],
    },
  });

export default feathersClient;

// Setup feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex,
} = feathersVuex(feathersClient, {
  serverAlias: 'api', // or whatever that makes sense for your project
  idField: '_id', // `id` and `_id` are both supported, so this is only necessary if you're using something else.
});

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex,
};

// == AŞAĞIDAKİ BÖLÜM KAynağı: 'https://docs.feathersjs.com/api/authentication/client.html#customization'

// const feathers = require('@feathersjs/feathers');
// const socketio = require('@feathersjs/socketio-client');
// const io = require('socket.io-client');
// const auth = require('@feathersjs/authentication-client');

// const socket = io('http://localhost:3030');
// const app = feathers();

// class MyAuthenticationClient extends auth.AuthenticationClient {
//   getFromLocation(location) {
//     // Do custom location things here
//     return super.getFromLocation(location);
//   }
// }

// // Setup the transport (Rest, Socket, etc.) here
// app.configure(socketio(socket));

// // Pass the custom authentication client class as the `Authenticaiton` option
// app.configure(
//   auth({
//     Authentication: MyAuthenticationClient,
//   }),
// );
