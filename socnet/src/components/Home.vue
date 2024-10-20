<template>
    <router-link to="/humans">
      <img style="width: 100vw; height: 100vh; object-fit: cover;" src="../assets/socnet.svg" class="logo vue" alt="socnet logo" />
    </router-link>
</template>
<style scoped>
.logo {
  /* height: 6em; */
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>