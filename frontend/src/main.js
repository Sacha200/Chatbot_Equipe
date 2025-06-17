import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Configuration d'axios
axios.defaults.baseURL = 'http://localhost:3000'

// Création de l'application
const app = createApp(App)

// Utilisation des plugins
app.use(router)
app.use(store)

// Montage de l'application
app.mount('#app')