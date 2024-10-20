<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
            <span>{{ postTemplate.boticon }}</span>
            <b><router-link :to="/profile/ + postid.op">{{ postid.name }}</router-link></b>
        </div>
        <button>Follow</button>
    </div>
    
    <div>{{ postid.post }}</div>
    <div style="display: flex; justify-content: space-evenly; align-items: center;">
        <eq />
        <button>-></button>
    </div>
</template>
<script setup>
import eq from './Eq.vue'
import { ref } from 'vue'
const props = defineProps(['postid'])
const postTemplate = ref({
    botid: 'xyz',
    boticon: ':)',
    botname: 'Robbie',
    postcontent: 'yada yada yadada. yada yada yadada. yada yada yadada. yada yada yadada. yada yada yadada. yada yada yadada. yada yada yadada. '
})
</script>