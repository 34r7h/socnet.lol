<!-- src/components/CircleSelector.vue -->
<template>
    <div class="circle" @click="handleClick" ref="circleRef"></div>
</template>

<script setup>
import { ref } from 'vue'

const circleRef = ref(null)

function handleClick(event) {
    const circle = circleRef.value.getBoundingClientRect()
    const centerX = circle.left + circle.width / 2
    const centerY = circle.top + circle.height / 2
    const clickX = event.clientX
    const clickY = event.clientY

    const deltaX = clickX - centerX
    const deltaY = clickY - centerY

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    console.log({ angle, distance });

    return [angle, distance]
}
</script>

<style scoped>
.circle {
    width: 50px;
    height: 50px;
    background-color: lightblue;
    border-radius: 50%;
    position: relative;
}
</style>