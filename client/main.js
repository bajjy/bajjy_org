import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router.js';

import '@css/protocol88.css';
import '@css/components.css';

createApp(App).use(router).mount('#app');
