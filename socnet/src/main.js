// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './routes.js';
import { useMainStore } from './store.js';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Make $state and $api globally available
app.config.globalProperties.$state = useMainStore();  // Make store available
// app.config.globalProperties.$api = api;  // Make API object available

app.use(router).mount('#app');