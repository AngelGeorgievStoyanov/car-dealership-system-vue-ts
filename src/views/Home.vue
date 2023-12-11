<script>
import * as carsService from "../services/carsService";
import CarsCard from "./components/CarsCard.vue";
export default {
  components: { CarsCard },
  data() {
    return {
      cars: [],
    };
  },
  async created() {
    await carsService
      .getAllCars()
      .then((data) => {
        this.cars = data;
      })
      .catch((error) => {
        console.log(error.message || error);
      });
  },
};
</script>

<template>
  <div class="div-cars" v-if="cars.length > 0">
    <CarsCard v-for="car in cars" :key="car._id" :cars="car"></CarsCard>
  </div>
  <div class="div-cars" v-else>
    <h3>Welcome!</h3>
    <p>No cars available</p>
  </div>
</template>

<style scoped>
.div-cars {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(var(--user-cols, 1), 1fr);
  gap: 1rem;
}

@media screen and (min-width: 820px) {
  .div-cars {
    --user-cols: 2;
  }
}

@media screen and (min-width: 1260px) {
  .div-cars {
    --user-cols: 3;
  }
}
</style>
