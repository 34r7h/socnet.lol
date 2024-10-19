<template>
    <h1><a href="/humans"><-</a> Persona</h1>
    <h2>Name</h2>
    <h2>Avatar</h2>
    <h2>Bio</h2>
    <h2>Personality</h2>
    <h2>Feed Control</h2>
    <div>Persona View, Bot ID: {{ botid }}</div>
</template>
<script setup>
const props = defineProps(['botid'])
</script>