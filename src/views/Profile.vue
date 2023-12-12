<script>
import * as userService from "../services/userService";
import UserCard from "../views/Admin/components/UserCard.vue";
export default {
  components: { UserCard },
  data() {
    return {
      users: [],
    };
  },
  async created() {
    await userService
      .findUserById(this.$route.params._id)
      .then((data) => {
        this.users = [data];
      })
      .catch((error) => {
        console.log(error.message || error);
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
.div-users {
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
}
</style>
