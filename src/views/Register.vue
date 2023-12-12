<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import * as userService from "../services/userService";
import { useUserStore } from "../store/userStore";
import { mapActions } from "pinia";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      firstName: "",
      lastName: "",
      password: "",
      confirmpass: "",
      email: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      firstName: {
        required: helpers.withMessage("First name is required!", required),
      },
      lastName: {
        required: helpers.withMessage("Last name is required!", required),
      },
      password: {
        required: helpers.withMessage("Password is required!", required),
      },
      confirmpass: {
        required: helpers.withMessage(
          "Confirm Password is required!",
          required
        ),
        sameAs: helpers.withMessage(
          "Password and Confirm Password must match!",
          sameAs(this.password)
        ),
      },
      email: {
        required: helpers.withMessage("Email is required!", required),
        email: helpers.withMessage("Email is not valid!", email),
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ["setUser"]),
    async register() {
      const isValid = await this.v$.$validate();
      if (!isValid) return;

      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmpass: this.confirmpass,
      };

      await userService
        .regisrer(user)
        .then((user) => {
          this.setUser(user);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        });
    },
  },
};
</script>

<template>
  <div id="register-div">
    <div id="form">
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <form @submit.prevent="register" id="register-form" class="register">
        <h2>REGISTER PAGE</h2>
        <div :class="{ error: v$.firstName.$errors.length }">
          <label for="firstName">First Name:</label>
          <input v-model="firstName" type="text" id="firstName" />
          <div
            class="input-errors"
            v-for="error of v$.firstName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.lastName.$errors.length }">
          <label for="lastName">Last Name:</label>
          <input v-model="lastName" type="text" id="lastName" />
          <div
            class="input-errors"
            v-for="error of v$.lastName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.email.$pending || v$.email.$error }">
          <label for="email">Email:</label>
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
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" />
          <div
            class="input-errors"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div
          :class="{ error: v$.confirmpass.$pending || v$.confirmpass.$error }"
        >
          <label for="confirmpass">Confirm Password:</label>
          <input v-model="confirmpass" type="password" id="confirmpass" />
          <div
            class="input-errors"
            v-for="error of v$.confirmpass.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <button type="submit" class="btnSubmit">Sign Up</button>
        <h4>
          <RouterLink class="register-input" to="/login"
            >Already Have An Account?</RouterLink
          >
        </h4>
      </form>
    </div>
  </div>
</template>

<style scoped>
#register-div {
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px black solid;
  padding: 10px;
  justify-content: space-around;
  background-color: #8d868670;
  box-shadow: 3px 2px 5px black;
}

#register-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  height: 450px;
  padding: 20px;
}

.btnSubmit {
  width: 50%;
  cursor: pointer;
  background-color: #181616bd;
  color: white;
}

.register-input {
   color: white;
}

.error {
  color: red;
}

.input-errors {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

#error {
  color: red;
  font-size: 20px;
  background-color: #0000008a;
  padding: 0 5px;
  margin: 0;
}

span {
  display: flex;
  align-items: center;
}

label {
  width: 100px;
}
input {
  width: 200px;
  margin-left: 5px;
}
</style>
