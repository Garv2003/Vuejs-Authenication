import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routes/routes'
import Toast, { POSITION } from "vue-toastification";

import "vue-toastification/dist/index.css";

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
}).mount('#app')
