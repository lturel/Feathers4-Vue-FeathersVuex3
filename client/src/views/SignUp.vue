<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form v-if="!loading" v-model="valid" @submit.prevent="createUser" @keydown.prevent.enter>
          <v-text-field v-model="user.email" :rules="notEmptyRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">SignUp</v-btn>
        </v-form>

        <div v-for="user in users().data" :key="user._id">{{ user.email }}</div>

        <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "signUp",
  data: vm => ({
    valid: false,
    confirmPassword: "",
    user: {
      email: "",
      password: ""
    },
    notEmptyRules: [value => !!value || "Can not be empty"],
    confirmPasswordRules: [
      confirmPassword =>
        confirmPassword === vm.user.password || "Password must match."
    ]
  }),
  computed: {
    ...mapGetters("users", { users: "find" }),
    ...mapState("users", { loading: "isCreatePending" })
  },
  methods: {
    ...mapActions("users", ["create", "find"]),
    ...mapActions("auth", ["authenticate"]),

    async createUser() {
      // console.log(this.user);
      const { User } = this.$FeathersVuex.api;
      const user = new User(this.user);

      const credentials = {
        email: this.user.email,
        password: this.user.password
      };

      await user.save().then(user => {
        console.log(user);
        this.$router.push("/about");
      });
    }
  }
};
</script>
