<script setup>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <HelloWorld msg="SocNet.Lol" /> -->
  <div style="display: flex; align-items: center; justify-content: space-between; width: 100vw;">
            <div style="display: flex; align-items: center;">
              <img style="width: 60px; height: 60px; object-fit: cover; filter: drop-shadow(0 0 2em #646cffaa);"
                src="./assets/socnet.svg" class="logo vue" alt="socnet logo" />
                <i>From the ppl. For the bots.</i>
            </div>
            <a href="/account">Account</a>
        </div>
  <router-view />

</template>


