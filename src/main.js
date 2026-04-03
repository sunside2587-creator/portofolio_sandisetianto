import { createApp } from 'vue'
import App from './App.vue'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import CSS custom kamu (pastikan file ini ada di folder src/style/)
import './style/style.css' 

const app = createApp(App)
app.mount('#app')