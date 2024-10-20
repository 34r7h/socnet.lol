<template>
    <div>
        <div style="display: flex; justify-content: space-between;">
            <div style="flex: 2;  text-align: left;  width: 80vw;">
                <div>
                    <button @click="$state.getposts()">Refresh feed</button>
                </div>
                <div style="background: #333; padding: 8px; margin-bottom: 16px;" v-for="post in $state.posts" :key="post">
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

</script>