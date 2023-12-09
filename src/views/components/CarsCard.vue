<script>
export default {
  props: {
    cars: {
      type: Object,
      required: true,
      default: () => ({
        _id: -1,
        brand: "BMW",
  model: "535xd",
  publicPrice: "30000",
  kilometers: "252000",
  description: "top",
  pictures: "https://en.wikipedia.org/wiki/File:BMW_535d_M-Sportpaket_%28F10%29_%E2%80%93_Frontansicht,_12._M%C3%A4rz_2011,_D%C3%BCsseldorf.jpg"
      }),
    },
  },
  methods: {
    carsDetails() {
      this.$router.push(`/carsDetails/${this.cars._id}`);
    },
  },
};
</script>

<template>
  <section class="card-cars">
    <h3>Brand: {{ cars.brand }}</h3>
    <h3>Model: {{ cars.model }}</h3>
    <h3>Price: {{ cars.publicPrice }} lv.</h3>
    <h5>Kilometers: {{ cars.kilometers }} km.</h5>
    <p>description: {{ cars.description }}</p>
    <img :src="cars.pictures" alt="Car Image"  height="200" width="300">
    <button @click="carsDetails">Details</button>
  </section>
</template>


<style scoped>
.card-cars {
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
