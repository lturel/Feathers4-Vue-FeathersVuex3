// src/store/store.auth.js
import { makeAuthPlugin } from "../feathers-client";

export default makeAuthPlugin({ userService: "users" });
