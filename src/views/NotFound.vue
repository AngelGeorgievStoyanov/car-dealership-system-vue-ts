<script>
export default {
  data() {
    return {
      count: 10,
      internalSec: null,
      internal: null,
    };
  },
  mounted() {
    this.internalSec = setInterval(() => {
      this.count--;
    }, 1000);
    this.internal = setTimeout(() => {
      this.$router.push("/");
    }, 10000);
  },
  methods: {
    goHome() {
      clearInterval(this.internalSec);
      clearTimeout(this.internal);
      this.$router.push("/");
    },
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.internalSec);
    clearTimeout(this.internal);
    next();
  },
  beforeDestroy() {
    clearTimeout(this.internal);
    clearInterval(this.internalSec);
  },
};
</script>
<template>
  <div class="not-found">
    <div class="div-not-found">
      <h3>PAGE NOT FOUND 404</h3>
      <h4>WRONG WAY!</h4>
    </div>
    <div class="div-time-out">
      <h3>
        {{ count }} SECONDS OR CLICK
        <button @click="goHome" class="home-button">HOME</button>
      </h3>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1619864066877-926b1c1d5a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.div-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
}

.div-time-out {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
}

.home-button {
  color: white;
  background: black;
  padding: 10px 30px;
  margin: 25px;
  cursor: pointer;
}

.home-button:hover {
  background: white;
  color: black;
}
h3,
h4 {
  color: white;
}
</style>
