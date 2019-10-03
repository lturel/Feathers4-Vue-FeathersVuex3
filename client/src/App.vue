<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Feathers-4 + F-Vuex-2.0</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn flat :to="{ name: 'login'}">Login</v-btn>
        <v-btn flat :to="{ name: 'signup'}">SignUp</v-btn>
      </div>
      <div v-if="user">
        <v-btn flat :to="{ name: 'about'}">About</v-btn>
        <v-btn flat :to="{ name: 'secret'}">Secret</v-btn>
        <v-btn flat @click="logout">LogOut</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  data: () => ({
    fixed: false
  }),
  computed: {
    ...mapState("auth", { user: "payload" })
  },
  methods: {
    //  ...mapActions("auth", ["logout"])  // bu şekilde logout eder ve olduğu sayfada kalır. Login için ;
    ...mapActions("auth", { myLogout: "logout" }), // bu logout auth'un logout'u
    logout() {
      // bu logout;  yeni custom logout
      this.myLogout().then(() => this.$router.push("/login"));
    }
  }
};
</script>
