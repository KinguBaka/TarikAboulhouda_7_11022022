import { createApp } from 'vue'
import App from './App.vue'
import './axios/axios'
import router from './router/router'
import store from './store/store'

createApp(App).use(store).use(router).mount('#app')
