<script>
import * as userService from "../../services/userService";
import UserCard from "./components/UserCard.vue";
export default {
  components: { UserCard },
  data() {
    return {
      users: [],
    };
  },
  async created() {
    await userService
      .getAllUsers()
      .then((data) => {
        this.users = data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
</script>

<template>
  <div class="div-users" v-if="users.length > 0">
    <UserCard v-for="user in users" :key="user._id" :user="user"></UserCard>
  </div>
</template>

<style scoped>
.div-users{
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(var(--user-cols, 1), 1fr);
  gap: 1rem;
}




@media screen and (min-width: 820px) {
  .div-users {
    --user-cols: 2;
  }
}

@media screen and (min-width: 1260px) {
  .div-users {
    --user-cols: 3;
  }
}
</style>
