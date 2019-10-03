<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form v-if="!loading" v-model="valid" @submit.prevent="login" @keydown.prevent.enter>
          <v-text-field v-model="user.email" :rules="notEmptyRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Login</v-btn>
        </v-form>

        <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { mapActions, mapState } from "vuex";

export default {
  name: "login",
  data: () => ({
    valid: false,
    user: {
      email: "",
      password: ""
    },
    notEmptyRules: [value => !!value || "Can not be empty"]
  }),
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" })
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),

    login() {
      if (this.valid) {
        // Authenticate with the local email/password strategy
        this.authenticate({ ...this.user, strategy: "local" })
          .then(() => {
            console.log(" Logged in ...");
            this.$router.push("/about");
          })
          .catch(e => {
            console.error("Authentication ERROR ...", e);
          });
      }
    }
  }
};
</script>
