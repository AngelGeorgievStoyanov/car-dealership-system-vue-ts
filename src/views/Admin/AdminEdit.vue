<script>
import * as userService from "../../services/userService";

export default {
  data() {
    return {
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
      },
    };
  },
  async created() {
    await userService
      .findUserById(this.$route.params._id)
      .then((data) => {
        this.user = data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  methods: {
    async updateUser() {
      const user = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        role: this.user.role,
        _id: this.user._id,
      };

      if (user) {
        await userService
          .editUser(user._id, user)
          .then((data) => {
            this.user = data;
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser" class="admin-edit-form">
      <div>
        <label for="firstName">First Name:</label>
        <h3>{{ user.firstName }}</h3>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <h3>{{ user.lastName }}</h3>
      </div>
      <div>
        <label for="email">Email:</label>
        <h3>{{ user.email }}</h3>
      </div>
      <div>
        <label for="role">Role:</label>
        <select v-model="user.role">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Update User</button>
    </form>
  </div>
</template>

<style scoped></style>
