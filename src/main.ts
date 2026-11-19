import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fontsource/manrope/cyrillic-600.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/cyrillic-700.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/inter/cyrillic-400.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/cyrillic-500.css'
import '@fontsource/inter/latin-500.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useBookingsStore } from './store/bookings'

const pinia = createPinia()
const app = createApp(App).use(pinia)
useBookingsStore(pinia)
app.use(router).mount('#app')