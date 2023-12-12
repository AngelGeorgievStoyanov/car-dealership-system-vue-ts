<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "../store/userStore";
import { mapActions, mapState } from "pinia";
import { email } from "@vuelidate/validators";

export default {
  components: {
    RouterLink,
  },
    computed: {
    ...mapState(useUserStore, ["email"]),
    ...mapState(useUserStore, ["role"]),
    ...mapState(useUserStore, ["_id"]),
  },
  methods: {
    ...mapActions(useUserStore, ["logout"]),
  },
};
</script>

<template>
  <header id="header" class="header">
    <nav id="nav" class="nav">
      <ul id="nav-ul" class="nav-ul">
        <li id="logo">
          <RouterLink to="/">LOGO</RouterLink>
        </li>
        <li class="li" v-if="email">
          <RouterLink :to="`/profile/${_id}`"
            >Welcome {{ this.email }}!</RouterLink
          >
        </li>
        <li class="li">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li v-if="!email" class="li">
          <RouterLink to="/login">Login</RouterLink>
        </li>
        <li v-if="role === 'admin' || role === 'manager'" class="li">
          <RouterLink to="/cars-create">Create cars</RouterLink>
        </li>
        <li v-if="role === 'admin'" class="li">
          <RouterLink to="/admin">Admin</RouterLink>
        </li>
        <li v-if="!email" class="li">
          <RouterLink to="/register">Register</RouterLink>
        </li>
        <li v-if="email" class="li">
          <RouterLink to="/" @click="logout">Logout</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  width: 100vw;
}
nav#nav,
.nav-logo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: black;
  color: white;
  width: 100%;
}

ul#nav-ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 10px;
  padding-right: 10px;
  cursor: pointer;
}

#logo {
  list-style-type: none;
}

li {
  margin: 5px;
  padding-right: 10px;
  padding-left: 10px;
  list-style-type: none;
}

a {
  color: white;
  text-decoration: none;
}

li > a {
  color: white;
  text-decoration: none;
}

@media (max-width: 400px) {
  .li {
    margin: 0;
  }

  .header {
    width: 100%;
  }

  #nav {
    width: 100%;
  }

  ul#nav-ul {
    margin-top: 0px;
    margin-right: 0px;
    margin-left: -50px;
    margin-top: 10px;
    padding-right: 0px;
    padding-left: 0px;
    list-style-type: none;
  }

  #logo > a {
    display: none;
    padding-left: -20px;
  }
}
</style>
