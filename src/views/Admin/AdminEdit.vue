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
      changed: true,
    };
  },
  watch: {
    "user.role": {
      handler(newValue, oldValue) {
        if (oldValue !== "" && oldValue != newValue) {
          this.changed = false;
        }
      },
      deep: true,
    },
  },
  async created() {
    await userService
      .findUserById(this.$route.params._id)
      .then((data) => {
        this.user = data;
      })
      .catch((error) => {
        console.log(error.message || error);
      });
  },
  methods: {
    async updateUser() {
      const user = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        role: this.user.email === "admin@admin.bg" ? "admin" : this.user.role,
        _id: this.user._id,
      };

      if (user) {
        await userService
          .editUser(user._id, user)
          .then((data) => {
            this.user = data;
            this.$router.push("/admin");
          })
          .catch((error) => {
            console.log(error.message || error);
          });
      }
    },
  },
};
</script>

<template>
  <div class="div-admin">
    <form @submit.prevent="updateUser" class="admin-edit-form">
      <h2>Edit user role</h2>
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
        <select :disabled="user.email === 'admin@admin.bg'" v-model="user.role">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        :disabled="changed"
        :class="changed ? 'btnEditDis' : 'btnEdit'"
        type="submit"
      >
        Update User
      </button>
    </form>
  </div>
</template>

<style scoped>
.div-admin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.admin-edit-form {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  height: fit-content;
  width: fit-content;
  padding: 20px;
  margin: 20px;
  min-width: 320px;
  box-shadow: 3px 2px 5px black;
  background-color: #8d868670;
}
.btnEditDis {
  margin-top: 60px;
}
.btnEdit {
  margin-top: 60px;
}
.btnEdit:hover {
  background-color: green;
  color: white;
}
</style>
