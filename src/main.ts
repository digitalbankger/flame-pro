import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import styles from './assets/css/style.css'

createApp(App).component('styles', styles).use(store).use(router).mount('#app')
