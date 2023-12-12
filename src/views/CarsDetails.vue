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
      .findCarsById(this.$route.params._id)
      .then((data) => {
        this.cars = Array(data);
      })
      .catch((error) => {
        console.log(error.message || error);
        this.$router.push("/");
      });
  },
};
</script>

<template>
  <div class="div-cars" v-if="cars.length > 0">
    <CarsCard v-for="car in cars" :key="car._id" :cars="car"></CarsCard>
  </div>
</template>

<style scoped>
.div-cars {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
