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
  <div v-else>
    <section class="section-cars">
      <h3>Welcome!</h3>
      <p>No cars available</p>
    </section>
  </div>
</template>

<style scoped>
.div-cars {
  display: flex;
  justify-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
