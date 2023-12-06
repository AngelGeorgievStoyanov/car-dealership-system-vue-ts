<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("Email is required!", required),
        email: helpers.withMessage("Email is not valid!", email),
      },
      password: {
        required: helpers.withMessage("Password is required!", required),
      },
    };
  },
  methods: {
    async login() {
      const isValid = await this.v$.$validate();
      console.log("Is form valid?", isValid);

      if (isValid) {
        const formData = {
          email: this.email,
          password: this.password,
        };

        // Използвайте formData по ваше усмотрение (например, изпращане към сървър и др.)
        console.log("Form data:", formData);
      }
    },
  },
};
</script>

<template>
  <div id="login-page">
    <div id="login-form" class="login-form">
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <form @submit.prevent="login" id="form" class="form">
        <h2>LOGIN PAGE</h2>
        <div :class="{ error: v$.email.$pending || v$.email.$error }">
          <label for="email">EMAIL:</label>
          <input v-model="email" type="email" id="email" />
          <div
            class="input-errors"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.password.$pending || v$.password.$error }">
          <label for="password">PASSWORD:</label>
          <input v-model="password" type="password" id="password" />
          <div
            class="input-errors"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <button type="submit" class="btnSubmit login-input">Log In</button>
        <h4>
          <RouterLink class="login-input" to="/register"
            >Don't Have An Account? Sign up!</RouterLink
          >
        </h4>
      </form>
    </div>
  </div>
</template>

<style scoped>
#login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#login-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 2px black solid;
  border-radius: 12px;
  padding: 60px 10px;
  height: 360px;
  justify-content: space-around;
  background-color: #8d868670;
  box-shadow: 3px 2px 5px black;
  padding: 20px;
}

.login-input {
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  width: 44%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.btnSubmit {
  width: 40%;
  cursor: pointer;
  width: 50%;
  cursor: pointer;
  background-color: #181616bd;
  color: white;
}

input {
  width: 200px;
  margin-left: 5px;
}

#error {
  color: red;
  margin: 2px;
  font-size: 20px;
  background-color: #000000ab;
  padding: 0 5px;
}

.input-errors {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
