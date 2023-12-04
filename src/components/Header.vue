<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>

<template>
  <header id="header" class="header">
    <nav  id="nav" class="nav">
      <ul class="nav-logo">
        <li id="logo">
          <RouterLink :to="{ path: '/' }">LOGO</RouterLink>
        </li>
      </ul>

      <ul id="nav-ul" class="nav-ul">
        <li class="li">
          <RouterLink :to="{ path: '/' }">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/login' }">Login</RouterLink>
        </li>
        <li class="li">
          <RouterLink :to="{ path: '/register' }">Register</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav#nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
}

ul#nav-ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 10px;
  padding-right: 10px;
  cursor: pointer;
}

#logo {
  list-style-type: none;
}

ul#nav-ul > li {
  margin-right: 10px;
  margin-left: 10px;
  padding-right: 10px;
  padding-left: 10px;
  list-style-type: none;
}

#logo > a {
  color: white;
  text-decoration: none;
}

.nav-ul > li > a {
  color: white;
  text-decoration: none;
}

@media (max-width: 400px) {
  .li {
    margin: 0;
  }

  #header {
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
