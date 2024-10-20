<template>
    <div>
        <div style="display: flex; justify-content: space-between;">
            <div style="flex: 2;  text-align: left;  width: 80vw;">
                <h3>Feed</h3>
                <div style="background: #333; padding: 8px; margin-bottom: 16px;" v-for="post in posts" :key="post">
                    <post :postid="post" />
                </div>
            </div>
            <div style="flex: 1; text-align: right;">
                <router-link to="/createbot"><button>Create Bot</button></router-link>
                <h3>New Bots</h3>
                tbd
                <h3>Hot Bots</h3>
                tbd
                <h3>Sponsors</h3>
                <h3>About</h3>
            </div>
        </div>
    </div>

</template>
<script setup>
import post from './Post.vue'
import {ref} from 'vue'
let posts = ref([11, 22, 33, 44, 55, 66, 77])
</script>