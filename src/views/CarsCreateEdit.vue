<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import * as carsService from "../services/carsService";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      _id: "",
      refN: "",
      brand: "",
      carModel: "",
      publicPrice: "",
      kilometers: "",
      description: "",
      pictures: "",
      importDate: "",
      documents: "",
      errorMessage: "",
      editCar: false,
      cars: {},
      hasChanges: true,
    };
  },
  validations() {
    return {
      refN: {
        required: helpers.withMessage("Ref num is required!", required),
      },
      brand: {
        required: helpers.withMessage("Brand is required!", required),
      },
      carModel: {
        required: helpers.withMessage("Model is required!", required),
      },
      publicPrice: {
        required: helpers.withMessage("Public price is required!", required),
      },
      kilometers: {
        required: helpers.withMessage("Kilometers is required!", required),
      },
      description: {
        required: helpers.withMessage("Description is required!", required),
      },
      importDate: {
        required: helpers.withMessage("Date of car is required!", required),
      },
      documents: {
        required: helpers.withMessage("Documents is required!", required),
      },
    };
  },
  watch: {
    refN(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    brand(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    carModel(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    publicPrice(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    kilometers(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    description(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    pictures(newValue, oldValue) {
      if (!!oldValue && JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        this.hasChanges = false;
      }
    },
    importDate(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
    documents(newValue, oldValue) {
      if (!!oldValue && oldValue != newValue) {
        this.hasChanges = false;
      }
    },
  },
  methods: {
    async createCars() {
      const isValid = await this.v$.$validate();
      if (!isValid) return;

      const car = {
        refN: this.refN,
        brand: this.brand,
        carModel: this.carModel,
        publicPrice: this.publicPrice,
        kilometers: this.kilometers,
        description: this.description,
        pictures: Array.isArray(this.pictures)
          ? this.pictures
          : [this.pictures],
        listPrice: this.listPrice,
        repairCost: this.repairCost,
        importDate: this.importDate,
        driver: this.driver,
        soldTo: this.soldTo,
        loadedFrom: this.loadedFrom,
        documents: this.documents,
        documentType: this.documentType,
      };
      await carsService
        .createCar(car)
        .then((data) => {
          console.log("Cars created in DB: ", data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error.message || error;
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        });
    },
    async editCars() {
      const isValid = await this.v$.$validate();
      if (!isValid) return;

      const car = {
        refN: this.cars.refN,
        brand: this.brand,
        carModel: this.carModel,
        publicPrice: this.publicPrice,
        kilometers: this.kilometers,
        description: this.description,
        pictures: Array.isArray(this.pictures)
          ? this.pictures
          : [this.pictures],
        importDate: this.importDate,
        documents: this.documents,
      };
      await carsService
        .editCars(this.cars._id, car)
        .then((data) => {
          console.log("Cars edited in DB: ", data);
          this.$router.push(`/cars-details/${data._id}`);
        })
        .catch((error) => {
          this.errorMessage = error.message || error;
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        });
    },
    async clearForm() {
      this._id = "";
      this.refN = "";
      this.brand = "";
      this.carModel = "";
      this.publicPrice = "";
      this.kilometers = "";
      this.description = "";
      this.pictures = "";
      this.importDate = "";
      this.errorMessage = "";
      this.documents = "";
      this.editCar = false;
      this.hasChanges = true;
      this.v$.$reset();
    },
    async loadData(id) {
      if (id) {
        this.editCar = true;
        this.hasChanges = true;
        await carsService
          .findCarsById(id)
          .then((data) => {
            this.cars = data;
            this._id = data._id;
            this.refN = data.refN;
            this.brand = data.brand;
            this.carModel = data.carModel;
            this.publicPrice = data.publicPrice;
            this.kilometers = data.kilometers;
            this.description = data.description;
            this.pictures = data.pictures;
            this.listPrice = data.listPrice;
            this.importDate = data.importDate.split("T")[0];
            this.documents = data.documents;
          })
          .catch((error) => {
            console.log(error.message || error);
            this.$router.push("/");
          });
      }
    },
    async carsDelete(id) {
      await carsService
        .deleteById(id)
        .then((data) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.message || error);
        });
    },
  },
  async beforeRouteLeave(to, from, next) {
    if (from.matched[0].path === "/cars-edit/:_id") {
      await this.clearForm();
    }
    next();
  },
  async beforeRouteEnter(to, from, next) {
    if (to.matched[0].path === "/cars-edit/:_id") {
      next((vm) => {
        vm.loadData(to.params._id);
      });
    } else {
      next();
    }
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.matched[0].path === "/cars-edit/:_id") {
      await loadData(to.params._id);
    }
    next();
  },

  async created() {
    if (this.$route.matched[0].path === "/cars-edit/:_id") {
      this.editCar = true;
      await carsService
        .findCarsById(this.$route.params._id)
        .then((data) => {
          this.cars = data;
          this._id = data._id;
          this.refN = data.refN;
          this.brand = data.brand;
          this.carModel = data.carModel;
          this.publicPrice = data.publicPrice;
          this.kilometers = data.kilometers;
          this.description = data.description;
          this.pictures = data.pictures;
          this.importDate = data.importDate.split("T")[0];
          this.documents = data.documents;
        })
        .catch((error) => {
          console.log(error.message || error);
          this.$router.push("/");
        });
    }
  },
};
</script>
<template>
  <div id="create-div">
    <div id="create">
      <form
        @submit.prevent="this.editCar ? editCars() : createCars()"
        id="create-form"
        class="create"
      >
        <h2>
          {{ this.editCar ? "EDIT CAR PAGE" : "CREATE CAR PAGE" }}
        </h2>
        <div :class="{ error: v$.refN.$errors.length }">
          <label for="refN">Ref num:</label>
          <input v-model="refN" type="number" id="refN" />
          <div
            class="input-errors"
            v-for="error of v$.refN.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.brand.$errors.length }">
          <label for="brand">Brand:</label>
          <input v-model="brand" type="text" id="brand" />
          <div
            class="input-errors"
            v-for="error of v$.brand.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.carModel.$errors.length }">
          <label for="carModel">Model:</label>
          <input v-model="carModel" type="text" id="carModel" />
          <div
            class="input-errors"
            v-for="error of v$.carModel.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.publicPrice.$errors.length }">
          <label for="publicPrice">Public Price:</label>
          <input v-model="publicPrice" type="text" id="publicPrice" />
          <div
            class="input-errors"
            v-for="error of v$.publicPrice.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.kilometers.$errors.length }">
          <label for="kilometers">Kilometers:</label>
          <input v-model="kilometers" type="text" id="kilometers" />
          <div
            class="input-errors"
            v-for="error of v$.kilometers.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.description.$errors.length }">
          <label for="description">Description:</label>
          <input v-model="description" type="text" id="description" />
          <div
            class="input-errors"
            v-for="error of v$.description.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div>
          <label for="pictures">Pictures:</label>
          <input v-model="pictures" type="text" id="pictures" />
        </div>

        <div :class="{ error: v$.importDate.$errors.length }">
          <label for="importDate">Date:</label>
          <input v-model="importDate" type="date" id="importDate" />
          <div
            class="input-errors"
            v-for="error of v$.importDate.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div :class="{ error: v$.documents.$errors.length }">
          <label for="documents">Documents:</label>
          <select v-model="documents" id="documents">
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          <div
            class="input-errors"
            v-for="error of v$.documents.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <button
          :disabled="hasChanges"
          type="submit"
          :class="hasChanges ? 'btnSubmitDis' : 'btnSubmit'"
        >
          {{ this.editCar ? "Edit car" : "Create Record" }}
        </button>
        <button
          v-if="this.editCar"
          class="btnDelete"
          type="button"
          @click="carsDelete(cars._id)"
        >
          Delete car
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#create-div {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#create {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px black solid;
  padding: 10px;
  justify-content: space-around;
  background-color: #8d868670;
  box-shadow: 3px 2px 5px black;
  margin: 20px;
}

#create-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  height: auto;
  padding: 20px;
}

.btnSubmitDis {
  width: 50%;
  margin-top: 2px;
  margin-bottom: 2px;
}

.btnSubmit {
  width: 50%;
  cursor: pointer;
  background-color: #181616bd;
  color: white;
  margin-top: 2px;
  margin-bottom: 2px;
}
.btnSubmit:hover {
  background-color: green;
  color: white;
}

.btnDelete {
  width: 50%;
  cursor: pointer;
  background-color: #181616bd;
  color: white;
  margin-top: 2px;
  margin-bottom: 2px;
}

.btnDelete:hover {
  background-color: red;
  color: white;
}

.error {
  color: red;
}

.input-errors {
  color: red;
  font-size: 13px;
  margin: 0;
}

span {
  display: flex;
  align-items: center;
}

label {
  width: 120px;
}

input,
select {
  width: 200px;
  margin-left: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
