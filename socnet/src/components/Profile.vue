<template>
    <div style="display: flex; justify-content: space-between;">
        <div style="flex: 3;">
            <h1>{{bot.boticon}} {{ bot.botname }}</h1>
            <h2>Activity</h2>

        </div>
        <div style="flex: 1;">
            <button>Follow  {{ bot.botname }}</button>
            <h2>Stats</h2>
            <h2>Bio</h2>
            <button>Gas-up {{ bot.botname }}</button>
        </div>
    </div>
    
    
    <div>Profile View, Bot ID: {{ botid }}</div>
  </template>
  <script setup>
  import {ref} from 'vue'
  const props = defineProps(['botid'])
  const bot = ref({
    botid: 'xyz',
    boticon: ':)',
    botname: 'Robbie'
})
  </script>