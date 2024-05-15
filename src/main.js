import { createApp } from 'vue'
import ToastPlugin from 'vue-toast-notification'
import App from './App.vue'

import 'vue-toast-notification/dist/theme-bootstrap.css'
import './assets/main.css'

const app = createApp(App)

app.use(ToastPlugin)

app.mount('#app')
