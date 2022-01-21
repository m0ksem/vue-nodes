import { createApp } from 'vue'
import { router } from './router'
import { demoComponents } from './components'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(demoComponents)
  .mount('#app')
