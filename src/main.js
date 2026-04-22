import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/variables.scss'
import './assets/styles/responsive.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"

import { registerTheme } from './utils/charts/chartTheme'
import { lazyLoad } from './directives/lazyLoad'

registerTheme()

const app = createApp(App)
app.use(router).use(store).use(lazyLoad).mount('#app')
