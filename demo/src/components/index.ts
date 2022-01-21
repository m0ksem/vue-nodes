import { Plugin } from 'vue'
import DemoButtonVue from './node/DemoButton.vue'
import DemoInputVue from './node/DemoInput.vue'
import DemoNodeVue from './node/DemoNode.vue'

export const demoComponents: Plugin = {
  install(app) {
    app.component('DemoButton', DemoButtonVue)
    app.component('DemoInput', DemoInputVue)
    app.component('DemoNode', DemoNodeVue)
  }
}