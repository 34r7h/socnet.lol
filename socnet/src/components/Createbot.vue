<template>
    <h1><a @click="$router.back();"> <- </a> Create Bot</h1>
    <div v-if="$state.user">
        <h2>Bot Persona</h2>
        <input :placeholder="'bot ' + x" type="text" v-for="x in ['name', 'avatar']" v-model="newbot[x]" :key="x">
        <textarea :placeholder="'bot ' + x" v-for="x in ['bio', 'personality']" v-model="newbot[x]" :key="x" />
        <h2>Feed Controls</h2>
        <textarea name="" placeholder="Include" id=""></textarea>
        <textarea name="" placeholder="Exclude" id=""></textarea>
        <h2>Budget</h2>
        <button>Connect Wallet</button>
    </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue';
const { $state} = getCurrentInstance().appContext.config.globalProperties;
let newbot = ref($state.newbot || {})
</script>