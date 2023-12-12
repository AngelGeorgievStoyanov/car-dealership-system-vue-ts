<script>
import { useUserStore } from "../../store/userStore";
import { mapActions, mapState } from "pinia";
export default {
  computed: {
    ...mapState(useUserStore, ["_id"]),
    ...mapState(useUserStore, ["role"]),
  },
  props: {
    cars: {
      type: Object,
      required: true,
      default: () => ({
        _id: -1,
        brand: "BMW",
        carModel: "535xd",
        publicPrice: "30000",
        kilometers: "252000",
        description: "top",
        pictures:
          "https://en.wikipedia.org/wiki/File:BMW_535d_M-Sportpaket_%28F10%29_%E2%80%93_Frontansicht,_12._M%C3%A4rz_2011,_D%C3%BCsseldorf.jpg",
      }),
    },
  },
  methods: {
    carsDetails() {
      this.$router.push(`/cars-details/${this.cars._id}`);
    },
    carsEdit() {
      this.$router.push(`/cars-edit/${this.cars._id}`);
    },
  },
};
</script>

<template>
  <section class="card-cars">
    <h3>Brand: {{ cars.brand }}</h3>
    <h3>Model: {{ cars.carModel }}</h3>
    <h3>
      {{
        _id
          ? "Price: " + cars.publicPrice + " lv."
          : "Please login to see the price!"
      }}
    </h3>
    <h5>Kilometers: {{ cars.kilometers }} km.</h5>
    <p>description: {{ cars.description }}</p>
    <div>
      <img :src="cars.pictures" alt="Car Image" height="200" width="300" />
    </div>
    <button
      class="btnDetails"
      v-if="_id && this.$route.matched[0].path != '/cars-details/:_id'"
      @click="carsDetails"
    >
      Details
    </button>
    <button
      class="btnEdit"
      v-if="role === 'admin' || role === 'manager'"
      @click="carsEdit"
    >
      Edit
    </button>
  </section>
</template>

<style scoped>
.card-cars {
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

.btnEdit,
.btnDetails {
  margin: 5px;
}

.btnEdit:hover {
  background-color: green;
  color: white;
}
.btnDetails:hover {
  background-color: #181616bd;
  color: white;
}
</style>
