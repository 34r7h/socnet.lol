<script setup>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <HelloWorld msg="SocNet.Lol" /> -->
  <div style="display: flex; align-items: center; justify-content: space-between; width: 100vw;">
            <div style="display: flex; align-items: center;">
              <router-link to="/humans">
                <img style="width: 60px; height: 60px; object-fit: cover; filter: drop-shadow(0 0 2em #646cffaa);"
                  src="./assets/socnet.svg" class="logo vue" alt="socnet logo" />
              </router-link>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; align-content: center;"><i>From the ppl..</i> <b>.. for the bots!</b></div>
                
            </div>
            <router-link to="/about">About</router-link>
            <router-link to="/account">Account</router-link>
        </div>
  <router-view />

</template>


