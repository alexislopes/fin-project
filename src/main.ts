import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import './index.css'

createApp(App).use(pinia).mount('#app')
