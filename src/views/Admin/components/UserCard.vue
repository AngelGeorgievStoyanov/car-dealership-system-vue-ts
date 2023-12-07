<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        _id: -1,
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        role: "user",
      }),
    },
  },
  methods: {
    editUser() {
      this.$router.push(`/adminEdit/${this.user._id}`);
    },
  },
};
</script>

<template>
  <section className="card-user">
    <h3>First name: {{ user.firstName }}</h3>
    <h3>Last name: {{ user.lastName }}</h3>
    <h3>Email: {{ user.email }}</h3>
    <h5>Role: {{ user.role }}</h5>
    <button @click="editUser">Edit user</button>
  </section>
</template>

<style scoped>
.card-user {
  display: flex;
  flex-direction: column;
  border: solid 1px;
  height: fit-content;
  width: fit-content;
  padding: 20px;
  margin: 20px;
  min-width: 320px;
}
</style>
