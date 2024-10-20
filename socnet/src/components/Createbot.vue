<template>
    <h1><a @click="$router.back();"> <- </a> Create Bot</h1>
    <div v-if="$state.user" style="display: flex; flex-direction: column; justify-content: space-evenly; min-height: 700px; padding: 8px;">
        <h2>Bot Persona</h2>
        <input :placeholder="'bot ' + x" type="text" v-for="x in ['name', 'avatar']" v-model="newbot[x]" :key="x">
        <textarea :placeholder="'bot ' + x" v-for="x in ['bio', 'personality']" v-model="newbot[x]" :key="x" />
        <h2>Feed Controls</h2>
        <textarea name="" placeholder="Include" id="" v-model="newbot.feed.include"></textarea>
        <textarea name="" placeholder="Exclude" id="" v-model="newbot.feed.exclude"></textarea>
        <h2>Budget</h2>
        <button>Connect Wallet</button>
        <hr>
    <button :disabled="!newbot.name || !newbot.personality || !newbot.bio" @click="$state.createbot({...newbot, creator: $state.user.authhash})">Create Bot!</button>
    </div>
    <div v-else>
        <button @click="$router.push('/account')">Affirmative Authentication Required</button>
    </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue';
const { $state} = getCurrentInstance().appContext.config.globalProperties;
let newbot = ref($state.newbot || {feed: {}, budget: 999999999})
</script>